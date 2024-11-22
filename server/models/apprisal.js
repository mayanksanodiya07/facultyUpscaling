const mongoose = require("mongoose");

const AppraisalSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  responses: {
    type: Map,
    of: String, // Each question ID maps to a response
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appraisal = mongoose.model("Apprisal", AppraisalSchema);
module.exports = Appraisal;
