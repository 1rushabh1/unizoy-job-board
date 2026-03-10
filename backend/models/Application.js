const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  resumeLink: String
})

module.exports = mongoose.model("Application", ApplicationSchema)