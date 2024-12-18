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
    default: Date.now, 
    index: { expires: '15s' },
  },
  expiredAt: {
    type: Date,
    default: Date.now,
  },
});

const userVerification = new mongoose.model(
  "userVerification",
  userVerificationSchema
);

module.exports = userVerification;
