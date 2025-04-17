import { Request, Response } from "express";
import CourseModel from "../../model/course";

export const AddCourse = async(req:Request,res:Response) => {
    try {
        const { title, description, price, purchased } = req.body;

        const newCourse = await CourseModel.create({
            title,
            description,
            price,
            purchased
        })

        return res.status(200).json({message:"new Course created successfully"})

    } catch (e) {
        
    }
}