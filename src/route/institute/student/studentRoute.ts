



import express, { Router } from "express"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { getStudents } from "../../../controller/institute/student/studentController"

const router:Router = express.Router()

router.route("/")
.get(asyncErrorHandler(getStudents))



export default router

 