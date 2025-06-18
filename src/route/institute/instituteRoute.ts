



import express, { Router } from "express"

import isLoggedIn from "../../middleware/middleware"
import { createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../Institute/instituteController"



const router:Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute ,createTeacherTable,createStudentTable,createCourseTable)


export default router

 