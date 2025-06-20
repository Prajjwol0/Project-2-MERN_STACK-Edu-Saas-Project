



import express, { Router } from "express"

import asyncErrorHandler from "../../../services/asyncErrorHandler"
import isLoggedIn from "../../../middleware/middleware"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"
import {multer,storage} from "./../../../middleware/multerMiddleware"

const upload=multer({storage:storage})

const router:Router = express.Router()

router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourse))



router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 