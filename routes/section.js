const express = require("express");
const { getAllSection, createSection } = require("../controllers/section");

const sectionRouter = express.Router();

sectionRouter.get("/", getAllSection);
sectionRouter.post("/", createSection);

module.exports = { sectionRouter };
