
import express, { Router } from "express"
import createInstitute from "../../Institute/instituteController"

const router:Router = express.Router()

router.route("/").post(createInstitute)


export default router