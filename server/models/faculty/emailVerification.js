const mongoose = require("mongoose");
// console.log(mongoose)

// Create Schema
const emailVerificationSchema = new mongoose.Schema({
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
    // index: { expires: '15s' },
  },
  expiredAt: {
    type: Date,
    default: () => new Date(Date.now() + (3600 * 1000)),
  },
});

const emailVerification = new mongoose.model(
  "emailVerification",
  emailVerificationSchema
);

module.exports = emailVerification;
