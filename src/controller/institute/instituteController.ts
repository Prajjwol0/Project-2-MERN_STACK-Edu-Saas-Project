import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/user.model";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import categories from "../../seed";
import sendMail from "../../services/sendMail";

// Main function to create a new institute
const createInstitute = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    // Destructure required fields from request body
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    // Optional fields with default null values
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;

    // Validate required fields
    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
        res.status(400).json({
            message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
        });
        return;
    }

    // Generate unique institute number
    const instituteNumber = generateRandomInstituteNumber();

    // Create institute-specific table with basic institute information
    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        instituteName VARCHAR(255) NOT NULL, 
        instituteEmail VARCHAR(255) NOT NULL, 
        institutePhoneNumber VARCHAR(255) NOT NULL, 
        instituteAddress VARCHAR(255) NOT NULL, 
        institutePanNo VARCHAR(255), 
        instituteVatNo VARCHAR(255), 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    // Insert institute data into the newly created table
    await sequelize.query(
        `INSERT INTO institute_${instituteNumber}(instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo) 
        VALUES(?,?,?,?,?,?)`,
        {
            replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo]
        }
    );

    // Create user_institute junction table to track which users created which institutes
    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        userId VARCHAR(255) REFERENCES users(id), 
        instituteNumber INT UNIQUE 
    )`);

    // If user is authenticated (from middleware)
    if (req.user) {
        // Record the institute creation in user_institute table
        await sequelize.query(`INSERT INTO user_institute(userId, instituteNumber) VALUES(?,?)`, {
            replacements: [req.user.id, instituteNumber]
        });

        // Update user's current institute number and role
        await User.update({
            currentInstituteNumber: instituteNumber,
            role: "institute"
        }, {
            where: {
                id: req.user.id
            }
        });
    }

    // Update request object with new institute number
    if (req.user) {
        req.user.currentInstituteNumber = instituteNumber;
    }

    // Proceed to next middleware
    next();
};

// Function to create teacher table for the institute
const createTeacherTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
        teacherName VARCHAR(255) NOT NULL, 
        teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
        teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        teacherExpertise VARCHAR(255), 
        joinedDate DATE, 
        salary VARCHAR(100),
        teacherPhoto VARCHAR(255), 
        teacherPassword VARCHAR(255),
        courseId VARCHAR(100) REFERENCES course_${instituteNumber}(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
};

// Function to create student table for the institute
const createStudentTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const instituteNumber = req.user?.currentInstituteNumber;
        await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            studentName VARCHAR(255) NOT NULL, 
            studentPhoneNo VARCHAR(255) NOT NULL UNIQUE, 
            studentAddress TEXT, 
            enrolledDate DATE, 
            studentImage VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )`);
        next();
    } catch (error) {
        console.log(error, "Error");
        res.status(500).json({
            message: error
        });
    }
};

// Function to create course table for the institute
const createCourseTable = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE, 
        coursePrice VARCHAR(255) NOT NULL, 
        courseDuration VARCHAR(100) NOT NULL, 
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL, 
        courseThumbnail VARCHAR(200),
        courseDescription TEXT, 
        teacherId VARCHAR(36) REFERENCES teacher_${instituteNumber}(id), 
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber}(id), 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    // Send success response with institute number
    res.status(200).json({
        message: "Institute created successfully!!!",
        instituteNumber,
    });
};

// Function to create category table and seed with initial data
const createCategoryTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    
    // Create category table structure
    await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        categoryName VARCHAR(100) NOT NULL, 
        categoryDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    // Seed the category table with initial data from seed file
    categories.forEach(async function (category) {
        await sequelize.query(
            `INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES(?,?)`,
            {
                replacements: [category.categoryName, category.categoryDescription]
            }
        );
    });

    next();
};

export { createInstitute, createTeacherTable, createStudentTable, createCourseTable, createCategoryTable };