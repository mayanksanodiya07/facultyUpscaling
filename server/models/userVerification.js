const mongoose = require("mongoose");
// console.log(mongoose)

// Create Schema
const userVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    // ref: "faculty",
    // required: true,
  },
   secretString: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
  },
  expiredAt: {
    type: Date,
  }
});

const userVerification = new mongoose.model(
  "Faculties",
  userVerificationSchema
);

module.exports = userVerification;
