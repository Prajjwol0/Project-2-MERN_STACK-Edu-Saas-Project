import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { QueryTypes } from "sequelize";

const createCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const {
    coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
    categoryId
  } = req.body;
  if (
    !coursePrice ||
    !courseName ||
    !courseDescription ||
    !courseDuration ||
    !courseLevel ||
    !categoryId
  ) {
    return res.status(400).json({
      message:
        "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel, categoryId",
    });
  }
  const courseThumbnail = req.file ? req.file.path : null;
  console.log(courseThumbnail + "courseThumbnail");
  const returnedData = await sequelize.query(
    `INSERT INTO course_${instituteNumber}(coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail,categoryId) VALUES(?,?,?,?,?,?,?)`,
    {
      type:QueryTypes.INSERT,
      replacements: [
        coursePrice,
        courseName,
        courseDescription,
        courseDuration,
        courseLevel,
        courseThumbnail,
        categoryId
      ],
    }
  );

  console.log(returnedData);
  res.status(200).json({
    message: "course created successfully",
  });
};

const deleteCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  // first check if course exists or not , if exists --> delete else not delete
  const courseData = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id=?`,
    {
      type:QueryTypes.SELECT,
      replacements: [courseId],
    }
  );

  if (courseData.length == 0) {
    return res.status(404).json({
      message: "no course with that id",
    });
  }

  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId],
    type:QueryTypes.DELETE
  });
  res.status(200).json({
    message: "course deleted successfully",
  });
};

const getAllCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courses = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} JOIN category_${instituteNumber} on course_${instituteNumber}.categoryId=category_${instituteNumber}.id`
  ,{
    type:QueryTypes.SELECT
  });
  res.status(200).json({
    message: "Course fetched",
    data: courses,
  });
};

const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  const course = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
    {
      type:QueryTypes.SELECT,
      replacements: [courseId],
    }
  );
  res.status(200).json({
    message: "single course fetched",
    data: course,
  });
};

export { createCourse, deleteCourse, getSingleCourse, getAllCourse };
