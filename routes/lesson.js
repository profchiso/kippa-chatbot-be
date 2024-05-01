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
lessonRouter.post("/", createLesson);
lessonRouter.post("/:lessonId/question", addQuestion);

module.exports = { lessonRouter };
