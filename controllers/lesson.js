const { getAll, STATUS_CODES, RESPONSE_TEXT } = require("../utils/index");
const { Lesson } = require("../models/lesson");
const { Course } = require("../models/course");
exports.getAllLesson = async (req, res) => {
  try {
    getAll(req, res, Course, CourseExcludedFields);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.getALesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "lessons"
    );
    getOne(req, res, Course, CourseExcludedFields);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const relatedCourse = await Course.findById(courseId);
    if (!relatedCourse) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Course not found" }],
      });
    }
    const { title, description } = req.body;
    const createdLesson = await Lesson.create({ title, description });
    relatedCourse.lessons.push(createdLesson.id);
    await relatedCourse.save();
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      data: createdLesson,
      responseText: RESPONSE_TEXT.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    lesson.questions.push(req.body);
    await lesson.save();
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      resource: lesson,
      responseText: RESPONSE_TEXT.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
