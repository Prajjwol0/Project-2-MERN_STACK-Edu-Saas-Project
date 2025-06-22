import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";



const createCategory = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const {categoryName,categoryDescription} = req.body 
    if(!categoryName || !categoryDescription){
        return res.status(400).json({
            message : "Please provide categoryName, categoryDescription"
        })
    }
    await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`,{
        replacements : [categoryName,categoryDescription]
    })
    res.status(200).json({
        message : "Category added successfully"
    })
}

const getCategories = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const categories = await sequelize.query(`SELECT * FROM category_${instituteNumber}`)
    res.status(200).json({
        message : "Categories fetched successfully", 
        data : categories
    })
}

const deleteCategory = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const id = req.params.id 
    await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id = ?`,{
        replacements : [id]
    })
    res.status(200).json({
        message : "Category deleted successfully"
    })
}

export {createCategory,getCategories,deleteCategory}