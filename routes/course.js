const express = require("express");
const {
  getAllCourse,
  getACourse,
  createCourse,
} = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.get("/", getAllCourse);
courseRouter.get("/:courseId", getACourse);
courseRouter.post("/", createCourse);

module.exports = { courseRouter };
