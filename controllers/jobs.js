const JobListing = require("../models/jobListingModel");

exports.addJob = async (req, res) => {
  try {
    const {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
    } = req.body;

    // Check if all the required fields are provided
    if (
      !companyName ||
      !jobPosition ||
      !jobDescription ||
      !skillsRequired ||
      !aboutCompany ||
      !monthlySalary ||
      !jobType ||
      !remoteOnsite ||
      !addLogoURL
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // If jobType is "remote", set jobLocation to empty string
    const updatedJobLocation = jobLocation === "" ? "Remote" : jobLocation;

    const updatedLogoURL = req.body.addLogoURL
      ? req.body.addLogoURL
      : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

    // Create a new job listing
    const newJobListing = new JobListing({
      companyName,
      addLogoURL: updatedLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation: updatedJobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
    });

    await newJobListing.save();

    res.status(201).json({ message: "Job listing created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

