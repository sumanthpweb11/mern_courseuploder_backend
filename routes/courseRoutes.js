import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

// Get All Courses without lectures
// Access: All Users
router.route("/courses").get(getAllCourses);

// Create New Course
// Access: Admin Only
router.route("/createcourse").post(createCourse);

// Add Lecture, Delete Course,Get Course Details

// Delete Lecture

export default router;
