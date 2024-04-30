const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.Course = model("Course", courseSchema);
