

import  express,{ Router } from "express";

const router:Router=express.Router()
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createTeacher } from "../../../controller/institute/teacher/teacherController";
import upload from "../../../middleware/multerUpload";

router.route("/").post(isLoggedIn,upload.single('teacherPhoto'),asyncErrorHandler(createTeacher))

export default router;
