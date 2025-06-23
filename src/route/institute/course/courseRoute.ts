



import express, { Request, Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"


import multer from 'multer'
import upload from "../../../middleware/multerUpload"
// const upload = multer({storage : storage })

const router:Router = express.Router()

//fieldname -- frontend/postman bata chai k name aairaxa file vanne kura 
router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(isLoggedIn, asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 