import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";



const createCourse = (req:Request, res:Response)=>{
    const {coursePrice, courseName, courseDescription, courseLevel,courseDuration}=req.body
    if(!coursePrice || !courseName || !courseDescription || courseLevel){
        return res.status(400).json({
            message:"Please provide every details"
        })
    }

    const courseThumbnail = null

    sequelize.query(`INSERT INTO course_${instituteNumber}(coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail)VALUES(?,?,?,?,?,?,?)`,{
        replacements:[coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail,courseThumbnail || "kunai_png.png"]
    })

}console.log(returnedData)
resizeBy.status(200).json({
    message : 'course created successfully'
})
}
const deleteCourse = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber= req.user?.currentInstituteNumber
    const courseId = req.params.id
// First check if course exists or not, if exists ---> delete else not
    const courseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} Where id=?`,{
        replacements:[courseId]
    })
    sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=?`,{
        replacements:[courseId]

    })
    if(courseData.length==0){
        
    }
    res.status(200).json({
        message:"Deleted!!"
    })
}

const getAllCourse=(req:IExtendedRequest,res:Response)=>{
    const instituteNumber=req.user?.currentInstituteNumber;
    const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    res.status(200).json({
        message:"Course Fetched",
        data:courses
    })
}

const getSingleCourse=async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber=req,user?.currentInstituteNumber;
    const courseId=await
}

export {createCourse,deleteCourse,getAllCourse,getSingleCourse}