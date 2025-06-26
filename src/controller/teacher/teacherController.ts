

// Teacher login Implementation

import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateJWTToken from "../../services/generateJwtToken";

interface ITeacherData{
    teacherPassword : string
    id:string
}


const teacherLogin = async(req:Request,res:Response)=>{
    const {teacherEmail,teacherPassword,teacherInstituteNumber}=req.body;
if(!teacherEmail || !teacherPassword || !teacherInstituteNumber){
    return res.status(200).json({
        message:"Please provide teacherEmail,teacherPassword,teacherInstituteNumber"
    })
}
   const teacherData:ITeacherData[]= await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail=?`,{
    type: QueryTypes.SELECT,
    replacements:[teacherEmail]
    })

    if(teacherData.length==0){
        return res.status(404).json({
            message:"Invalid credentials"
        })
    }
    // check password data
    const isPasswordMatched = bcrypt.compareSync(teacherPassword,teacherData[0].teacherPassword)
    if(!isPasswordMatched){
        res.status(200).json({
            message:"Teacher password didnt matched!"
        })
     }else{
       const token= generateJWTToken({id: teacherData[0].id,
        instituteNumber:teacherInstituteNumber}
       )
       res.status(200).json({
        message:" teacher Logged in successfully",
        token:token
       })
     }
}


export {teacherLogin}


