const mongoose = require("mongoose");

const FacultyAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  basicInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicInformation",
  },
  professionalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfessionalInformation",
  },
  addressInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddressDetails",
  },
  accountSecurityInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccountSecurity",
  },
  optionalQuestionsInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OptionalQuestions",
  },
  apprisalResponses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apprisal",
  },
});

module.exports = mongoose.model("FacultyAccount", FacultyAccountSchema);
