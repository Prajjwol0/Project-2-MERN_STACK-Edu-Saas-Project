

import express, { Router } from 'express'
// import { createCategory, deleteCategory, getCategories } from '../../../controller/institute/category/categoryController';

import isLoggedIn from '../../../middleware/middleware';
import asyncErrorHandler from '../../../services/asyncErrorHandler';
import { createCategory, deleteCategory, getCategories } from '../../../controller/institute/category/categoryController';
const router:Router = express.Router()


router.route("/").post(isLoggedIn,asyncErrorHandler(createCategory))
.get(isLoggedIn,asyncErrorHandler(getCategories))

router.route("/:id").delete(isLoggedIn,asyncErrorHandler(deleteCategory))

export default router ; 