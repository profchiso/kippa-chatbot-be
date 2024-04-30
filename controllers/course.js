const {
  getAll,
  STATUS_CODES,
  RESPONSE_TEXT,
  getOne,
} = require("../utils/index");
const { Course } = require("../models/course");
exports.getAllCourse = async (req, res) => {
  try {
    const course = await Course.find({})
      .populate("lessons")
      .populate({
        path: "lessons",
        populate: {
          path: "sections",
          model: "Section",
        },
      });
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      resource: course,
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
exports.getACourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("lessons")
      .populate({
        path: "lessons",
        populate: {
          path: "sections",
          model: "Section",
        },
      });
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      resource: course,
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

exports.createCourse = async (req, res) => {
  try {
    const { title, introduction } = req.body;
    const createdCourse = await Course.create({ title, introduction });
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      resource: createdCourse,
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
