

import express,{Router} from 'express'
import { teacherLogin } from "../../controller/teacher/teacherController";
import asyncErrorHandler from '../../services/asyncErrorHandler';
const router:Router=express.Router()
router.route("/").post(asyncErrorHandler(teacherLogin))

export default router;

