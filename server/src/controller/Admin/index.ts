import { Request, Response } from "express";
import CourseModel from "../../model/course";
import cloudinary from "../../lib/Cloudinary";

export const AddCourse = async (req:any, res:any) => {
    try {
        const {
            title,
            description, // Expecting an array of strings or a single string with newline separators
            original_price,
            discount_price,
            discount,
            published,
            imageUrl
        } = req.body;

        // If description is a string, split it into an array
        const descriptionArray = Array.isArray(description)
        ? description
        : description.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
      

        let imageUrlToUse = imageUrl;
        if (imageUrl) {
            try {
                const uploadRes = await cloudinary.uploader.upload(imageUrl, {
                    folder: 'courses', // Optional: organize uploads into folders
                });
                imageUrlToUse = uploadRes.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }

        const newCourse = new CourseModel({
            title,
            description: descriptionArray,
            original_price,
            discount_price,
            discount,
            published,
            imageUrl: imageUrlToUse,
        });

        await newCourse.save();

        return res.status(201).json({ message: "Course created successfully", data: newCourse });
    } catch (error:any) {
        console.error("Error adding course:", error);
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const UpdateCourse = async (req: any, res: any) => {
  try {
    const { courseId } = req.params;
    console.log({ courseId });

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(401).json({ message: "course not found" });
    }
    const {
      title,
      description,
      price,
      published,
      imageUrl,
      original_price,
      discount_price,
      discount,
    } = req.body;

    let updatedImageUrl = imageUrl;
    if (imageUrl) {
      const uploadRes = await cloudinary.uploader.upload(imageUrl);
      updatedImageUrl = uploadRes.secure_url;
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        original_price,
        discount_price,
        discount,
        title,
        description,
        price,
        published,
        imageUrl: updatedImageUrl,
      },
      { new: true } // Return the updated document
    );

    return res
      .status(200)
      .json({ message: "Course updated successfully", data: updateCourse });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteCourse = async (req: any, res: any) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(401).json({ message: "course not found" });
    }
    const deleteCourse = await CourseModel.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "course deleted successfully" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetCourse = async (req: any, res: any) => {
  try {
    const course = await CourseModel.find();
    return res.status(200).json({ message: "fetch all courses", data: course });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetCourseById = async (req: any, res: any) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(401).json({ message: "Invalid courseId" });
    }
    const course = await CourseModel.findById(courseId);
    return res.status(200).json({ message: "fetched course", data: course });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
