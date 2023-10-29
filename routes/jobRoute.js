const express = require("express");
const authenticateUser = require("../middleware/auth");
const { addJob,updateJob } = require("../controllers/jobs");

const jobRouter = express.Router();

jobRouter.route("/job-posting").post(authenticateUser, addJob);     // Create a new job listing (protected route)
jobRouter.route("/job-posting/:id").put(authenticateUser, updateJob);   //Update any job posted


module.exports = jobRouter;