
import express, { Router } from "express"
import {createInstitute} from "../../Institute/instituteController"
import Middleware from "../../middleware/middleware"

const router:Router = express.Router()

router.route("/").post(Middleware.isLoggedIn,Middleware.restrictTo,createInstitute)


export default router