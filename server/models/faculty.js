const mongoose = require("mongoose");
// console.log(mongoose)

// Create Schema
const Facultyschema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    // required: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
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

const collection = new mongoose.model("Faculties", Facultyschema);

module.exports = collection;
