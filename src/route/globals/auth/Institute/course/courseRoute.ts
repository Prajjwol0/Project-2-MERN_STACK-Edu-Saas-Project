



import express, { Router } from "express"

import asyncErrorHandler from "../../../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../../../controller/institute/course/courseController"
import isLoggedIn from "../../../../../middleware/middleware"
// import {multer} from "../../../auth/."

const router:Router = express.Router()

router.route("/")
.post(isLoggedIn,asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 