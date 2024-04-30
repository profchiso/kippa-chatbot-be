const express = require("express");
const {
  getAllCourse,
  getACourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.get("/", getAllCourse);
courseRouter.get("/:courseId", getACourse);
courseRouter.post("/", createCourse);
// courseRouter.patch("/", CourseCreationValidation, authenticate, updateCourse);
// courseRouter.delete(
//   "/:id",
//   authenticate,
//   authorize([USER_TYPES.ADMIN, USER_TYPES.DEVELOPER]),
//   deleteCourse
// );

module.exports = { courseRouter };
