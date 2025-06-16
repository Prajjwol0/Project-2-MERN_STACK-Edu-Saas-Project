import { NextFunction, Request, Response } from "express";
import sequelize from "../database/connection";
import generateinstitute from "../services/generateRandomInstituteNumber";
import User from "../database/models/user.model";
import { IExtendedRequest } from "../middleware/type";



const createInstitute = async (req:IExtendedRequest,res:Response,next:NextFunction)=>{
        // console.log("Triggered")
     
      try {
        const {instituteName,instituteEmail,institutePhoneNumber,instituteAddress} = req.body 
        const instituteVatNo = req.body.instituteVatNo || null 
        const institutePanNo = req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "Please provide instituteName,instituteEmail, institutePhoneNumber,  instituteAddress "
            })
            return
        }
//test

        // User.findByPk(req.user && req.user.id)
        // aayo vane - insitute create garnu paryo --> insitute_123123, course_123132 
        // institute (name)

        const instituteNumber =   generateinstitute()  
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            instituteName VARCHAR(255) NOT NULL, 
            instituteEmail VARCHAR(255) NOT NULL , 
            institutePhoneNumber VARCHAR(255) NOT NULL , 
            instituteAddress VARCHAR(255) NOT NULL, 
            institutePanNo VARCHAR(255), 
            instituteVatNo VARCHAR(255), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

        await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,{
            replacements : [instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo]
        })
        // 
        // to create user_institute history table jaha chai users le k k institute haru create garyo sabai ko number basnu paryo 
        await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            userId VARCHAR(255) REFERENCES users(id), 
            instituteNumber INT UNIQUE 
            )`)

            if(req.user){
            await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
                replacements : [req.user.id,instituteNumber]
            })

            // const user =  await User.findByPk(req.user.id)
            // user?.currentInstituteNumber = instituteNumber
            // await user?.save()

           await User.update({
            currentInstituteNumber : instituteNumber, 
            role : "institute"
            },{
                where : {
                    id : req.user.id
                }
            })
          }
         req.instituteNumber = instituteNumber  
        // req.user?.instituteNumber = instituteNumber; 
        next()
      } catch (error) {
        console.log(error)
      }
    }


const createTeacherTable = async (req:IExtendedRequest,res:Response,next:NextFunction)=>{
          
            const instituteNumber = req.instituteNumber
            await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            teacherName VARCHAR(255) NOT NULL, 
            teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
            teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE
            )`)
            next()
       
   
}

const createStudentTable = async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        studentName VARCHAR(255) NOT NULL, 
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE
        )`)
    next()
}

const createCourseTable = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.instituteNumber 
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        courseName VARCHAR(255) NOT NULL UNIQUE, 
        coursePrice VARCHAR(255) NOT NULL
        )`)

        res.status(200).json({
            message : "Institute created vayoo!!!", 
            instituteNumber, 
        })
}
export  {createInstitute,createTeacherTable,createStudentTable,createCourseTable}