const express = require("express");
const {
  getAllLesson,
  getALesson,
  createLesson,
  addQuestion,
} = require("../controllers/lesson");

const lessonRouter = express.Router();

lessonRouter.get("/", getAllLesson);
lessonRouter.get("/:id", getALesson);
lessonRouter.post("/:courseId", createLesson);
lessonRouter.post("/:lessonId/question", addQuestion);
// lessonRouter.patch("/", CourseCreationValidation, authenticate, updateCourse);
// lessonRouter.delete("/:id", authenticate, deleteCourse);

module.exports = { lessonRouter };
