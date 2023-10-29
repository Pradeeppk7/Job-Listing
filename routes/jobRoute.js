const express = require("express");
const authenticateUser = require("../middleware/auth");
const { addJob } = require("../controllers/jobs");

const jobRouter = express.Router();

jobRouter.route("/job-posting").post(authenticateUser, addJob);     // Create a new job listing (protected route)


module.exports = jobRouter;