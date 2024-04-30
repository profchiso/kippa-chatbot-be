const express = require("express");
const {
  getAllSection,
  getASection,
  createSection,
} = require("../controllers/section");

const sectionRouter = express.Router();

sectionRouter.get("/", getAllSection);
// sectionRouter.get("/:id", getASection);
sectionRouter.post("/:lessonId", createSection);
// sectionRouter.patch("/", CourseCreationValidation, authenticate, updateCourse);
// sectionRouter.delete("/:id", authenticate, deleteCourse);

module.exports = { sectionRouter };
