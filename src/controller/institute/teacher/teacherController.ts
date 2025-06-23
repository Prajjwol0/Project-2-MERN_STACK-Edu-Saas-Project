import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";


const createTeacher = async (req:IExtendedRequest,res:Response)=>{
const instituteNumber=req.user?.currentInstituteNumber;
    const {teacherName, teacherEmail, teacherExpertise,teacherSalary, teacherPhoneNumber,teacherJoinedDate,courseId}=req.body
const teacherPhoto=req.file ? req.file.path: "https://imgs.search.brave.com/nwn4OnN-Xzqhdo-o8MK7ecKkhQbkFTm3b7sP7GiXYjw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q0L2My/LzliL2Q0YzI5YmNl/ODA3NjRkYzUwZTcy/YTVmODdjMjU1ZGFi/LmpwZw"

    if(!teacherName || !teacherEmail || !teacherExpertise || !teacherSalary || !teacherJoinedDate || !teacherPhoneNumber){
    res.status(400).json({
        message:"Please provide teacherName, teacherEmail, teacherExpertise,teacherSalary, teacherPhoneNumber,teacherJoinedDate"
    })
}
const data= generateRandomPassword(teacherName)
const insertedData=await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPassword,teacherPhoto) VALUES(?,?,?,?,?,?,?,?)`,{
    type:QueryTypes.INSERT,
    replacements:[teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,teacherJoinedDate,teacherSalary,data.hashedVersion,teacherPhoto]
    })

    console.log(insertedData)

    await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE courseId=?`,{
        type:QueryTypes.UPDATE,
        replacements:[1,courseId]
    })

// Send mail function ::


res.send(200).json({
    message:"Teacher created"
})
}


export {createTeacher}