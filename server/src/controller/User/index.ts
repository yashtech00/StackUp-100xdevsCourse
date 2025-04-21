import CourseModel from "../../model/course";
import UserModel from "../../model/user";


export const GetUserCourse = async (req: any, res: any) => {
    try {
        const courses = await CourseModel.find({ published: true });
        return res.status(200).json({ message: "Fetched all published courses", data: courses });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const CoursePurchased = async (req: any, res: any) => {
    try {
        const user = await UserModel.findOne({ email: req.user.email }).populate("purchased");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Fetched purchased courses", data: { purchased: user.purchased } });
    } catch (e: any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const Purchase = async (req: any, res: any) => {
    try {
        const { courseId } = req.params;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }

        const user = await UserModel.findOne({ email: req.user.email })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        if (user.purchased.includes(course._id)) {
            return res.status(400).json({ message: "course already purchased" })
        }
        user.purchased.push(course._id);
        await user.save();
        return res.status(200).json({ message: "course purchased successfully", purchasedCourse: course })
    } catch (e: any) {
        console.error(e.message);
        return res.status(500).json({ message: "course purchased successfully" });
    }
}
export const CourseById = async (req: any, res: any) => {
    try {
        const { courseId } = req.params;
        const course = await CourseModel.findOne(courseId);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }
        const user = await UserModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "fetched course",data:course });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while fetching" });
    }
}

