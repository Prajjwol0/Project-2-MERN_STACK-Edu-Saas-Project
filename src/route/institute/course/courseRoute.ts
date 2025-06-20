



import express, { Request, Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"


import multer from 'multer'
// const upload = multer({storage : storage })
import {cloudinary,storage} from './../../../services/cloudinaryConfig'
const upload = multer({storage : storage, 

    fileFilter : (req:Request,file:Express.Multer.File,cb)=>{
        const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("Only image support garxaa hai!!!"))
        }
    }, 
    limits : {
        fileSize : 4 * 1024 * 1024 // 2 mb
    }
})
const router:Router = express.Router()

//fieldname -- frontend/postman bata chai k name aairaxa file vanne kura 
router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(isLoggedIn, asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 