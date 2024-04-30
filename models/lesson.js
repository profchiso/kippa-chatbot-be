const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  questions: [
    {
      question: String,
      optionA: String,
      optionB: String,
      optionC: String,
      answer: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.Lesson = model("Lesson", lessonSchema);
