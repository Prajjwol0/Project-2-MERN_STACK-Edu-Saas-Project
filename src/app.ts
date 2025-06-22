import express from 'express'
const app = express()
import authRoute from "./route/globals/auth/authRoute"
import instituteRoute from "./route/institute/instituteRoute"
import courseRoute from './route/institute/course/courseRoute'
import studentRoute from './route/institute/student/studentRoute'
import categoryRoute from './route/institute/category/categoryRoute'

app.use(express.json())
// alternative body-parser

app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)
app.use('/api/insitute/course',courseRoute)
app.use('/api/institute/student',studentRoute)
app.use('/api/institute/category',categoryRoute)

export default app