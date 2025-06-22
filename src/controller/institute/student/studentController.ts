import { Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";



const getStudents = async (req:IExtendedRequest,res:Response)=>{
    const insituteNumber = req.user?.currentInstituteNumber 
    const students = await sequelize.query(`SELECT * FROM student_${insituteNumber}`)
    res.status(200).json({
        messgae : "student fetched", 
        data : students
    })
}

export {getStudents}