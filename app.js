//NPM modules
require("dotenv").config(); //require the config files
const express = require("express");
const path = require("path");
const cors = require("cors");

//user defined modules
const { courseRouter } = require("./routes/course");
const { lessonRouter } = require("./routes/lesson");
const { sectionRouter } = require("./routes/section");

// db connection
const { connectToDb } = require("./utils/index");

connectToDb();

const app = express();
app.enable("trust proxy");

//middlewares

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json({ limit: "100mb" })); //middleware for body-paser
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //middle ware to allow cross origin resource sharing

app.use((req, res, next) => {
  let payloadSize = req.headers["content-length"];
  console.log(`[Request Payload Size: ${payloadSize}]`);
  console.log(
    `[time: "${new Date().toISOString()}"  method: "${req.method}"   url: "${
      req.originalUrl
    }"  payload: "${JSON.stringify(req.body)}"  user-agent: "${
      req.headers["user-agent"]
    }"  ip: "${req.ip}"]`
  );
  next();
});

//routes
app.get("/api/v1", (req, res) => {
  res.json({
    statusCode: 200,
    statusText: "SUCCESS",
    data: {
      msg: `Welcome   ${req.ip}`,
      resource: {},
    },
  });
});

//api routes
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/sections", sectionRouter);

//spin up the server on the env port number
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
