import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sendMail from "../../../services/sendMail";

const createTeacher = async (req: IExtendedRequest, res: Response) => {

     console.log("Request body:", req.body);
   console.log("User info in createTeacher:", req.user);
console.log("Current Institute Number:", req.user?.currentInstituteNumber);


  const instituteNumber = req.user?.currentInstituteNumber;
  if (!instituteNumber) {
    return res.status(400).json({ message: "No institute selected" });
  }

  const {
    teacherName,
    teacherEmail,
    teacherExpertise,
    teacherSalary,
    teacherPhoneNumber,
    teacherJoinedDate,
    courseId
  } = req.body;

  if (!teacherName || !teacherEmail || !teacherExpertise || !teacherSalary || !teacherJoinedDate || !teacherPhoneNumber ) {
    return res.status(400).json({
      message: "Please provide all required teacher fields"
    });
  }

  const teacherPhoto = req.file
    ? req.file.path
    : "https://imgs.search.brave.com/nwn4OnN-Xzqhdo-o8MK7ecKkhQbkFTm3b7sP7GiXYjw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q0L2My/LzliL2Q0YzI5YmNl/ODA3NjRkYzUwZTcy/YTVmODdjMjU1ZGFi/LmpwZw";

  const data = generateRandomPassword(teacherName);

  await sequelize.query(
    `INSERT INTO teacher_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary, teacherPassword, teacherPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        teacherName,
        teacherEmail,
        teacherPhoneNumber,
        teacherExpertise,
        teacherJoinedDate,
        teacherSalary,
        data.hashedVersion,
        teacherPhoto
      ]
    }
  );

  const [teacher]: any = await sequelize.query(
    `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail = ?`,
    {
      type: QueryTypes.SELECT,
      replacements: [teacherEmail]
    }
  );

  console.log('teacher.id:', teacher?.id);
console.log('courseId:', courseId);

  if (!courseId) {
  return res.status(400).json({ message: "courseId is required to assign teacher to a course." });
}

await sequelize.query(
  `UPDATE course_${instituteNumber} SET teacherId = ? WHERE id = ?`,
  {
    type: QueryTypes.UPDATE,
    replacements: [teacher.id, courseId],
  }
);


  await sendMail({
    to: teacherEmail,
    subject: "Welcome to my SaaS MERN project",
   text: `Dear ${teacherName},

Welcome to our educational platform! We’re thrilled to have you join our team and look forward to your valuable contributions.
Below are your login credentials:

Login Details:
Email: ${teacherEmail}
Phone Number: ${teacherPhoneNumber}
Expertise: ${teacherExpertise}
Temporary Password: ${data.plainVersion}
Your institute number: ${instituteNumber}
For your security, please log in and update your password as soon as possible.
If you have any questions or need assistance, don’t hesitate to reach out. We're here to help!

Best regards,
The Admin Team`
  });

  return res.status(200).json({
    message: "Teacher created"
  });
};

export { createTeacher };
