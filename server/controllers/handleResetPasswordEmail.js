const resetPasswordSchema = require("../models/ResetPassword");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

function sendResetPasswordEmail({ _id, email }, res) {
  const uniqueString = uuidv4() + _id; // Generate unique token
console.log("out:", _id)
  const mailOption = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Reset Your Password - Faculty Upscaling",
    html: `
      <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          
          <h2 style="text-align: center; color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          
          <p style="font-size: 16px; color: #555;">
            Dear Faculty Member,
          </p>
          
          <p style="font-size: 16px; color: #555;">
            We received a request to reset your password. Please click the button below to reset your password. 
            This link will expire in 15 minutes.
          </p>

          <a href="http://localhost:3000/faculty/reset-password/${_id}/${uniqueString}" 
            style="display: block; margin: 25px auto; padding: 12px 24px; 
            background-color: #1d4ed8; color: #ffffff; text-align: center; 
            text-decoration: none; border-radius: 5px; font-size: 18px; width: fit-content;">
            Reset Password
          </a>
  
          <p style="font-size: 16px; color: #555; margin-top: 20px;">
            If you did not request a password reset, please ignore this email.
          </p>
  
          <hr style="border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #999;">
            Need help? Contact our support team at <a href="mailto:support@facultyupscaling.com" style="color: #1d4ed8;">support@facultyupscaling.com</a>.
          </p>
  
          <p style="font-size: 14px; color: #999; text-align: center;">
            &copy; ${new Date().getFullYear()} Faculty Upscaling Platform. All Rights Reserved.
          </p>
        </div>
      </div>
    `,
  };

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then(async (hashUniqueString) => {
      await resetPasswordSchema.deleteOne({ userId: _id });

      // Save reset token in the database
      await resetPasswordSchema.insertMany([
        {
          userId: _id,
          resetToken: hashUniqueString,
          createdAt: Date.now(),
          expiredAt: Date.now() + 15 * 60 * 1000, // Expires in 15 minutes
        },
      ]);

      // Send the reset password email
      await transporter.sendMail(mailOption);

      res.json({
        message: "Password reset email has been sent.",
      });
    })
    .catch((err) => {
      console.error("Error sending reset email:", err);
      res.status(500).json({ message: "Failed to send reset email." });
    });
}

module.exports = {
  sendResetPasswordEmail,
};
