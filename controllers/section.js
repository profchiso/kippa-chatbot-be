const { getAll, RESPONSE_TEXT, STATUS_CODES } = require("../utils/index");
const { Section } = require("../models/section");
const { Lesson } = require("../models/lesson");

exports.getAllSection = async (req, res) => {
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

exports.createSection = async (req, res) => {
  try {
    const { title, description, lessonId } = req.body;
    const relatedLesson = await Lesson.findById(lessonId);
    if (!relatedLesson) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Lesson not found" }],
      });
    }

    const createdSection = await Section.create({ title, description });
    relatedLesson.sections.push(createdSection.id);
    await relatedLesson.save();
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      resource: createdSection,
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
