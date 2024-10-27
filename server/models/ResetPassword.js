const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  resetToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expires after 1 hour
});

module.exports = mongoose.model("ResetPassword", ResetPasswordSchema);
