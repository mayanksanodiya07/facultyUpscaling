const facultySchema = require("../models/xfacultys");
const userVerificationSchema = require("../models/userVerification");
const accountSecuritySchema = require("../models/accountSecurity");
const resetPasswordSchema = require("../models/ResetPassword");

// ////////////////////////////////////////////////////////

const facultyAccountSchema = require("../models/faculty/facultyAccount");
const emailVerificationSchema = require("../models/faculty/emailVerification");

const basicInformationSchema = require("../models/faculty/basicInformation");
const professionalInformationSchema = require("../models/faculty/professionalInformation");
const addressDetailsSchema = require("../models/faculty/addressDetails");
const optionalQuestionsSchema = require("../models/faculty/optionalQuestions");
const apprisalSchema = require("../models/faculty/apprisal");

const bcrypt = require("bcrypt");

const { sendVerificationEmail } = require("./handleVerificationEmail");
const { sendResetPasswordEmail } = require("./handleResetPasswordEmail");

const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { spawn } = require("child_process");
// const Appraisal = require("../models/apprisal");

const insertAllDetails = async (req, res) => {
  try {
    const { formData } = req.body;
    const userId = req.params.id;
    const {
      basic_information,
      professional_information,
      address_details,
      account_security,
      optional_questions,
    } = JSON.parse(formData);

    // Update the faculty profile with the new image URL
    const faculty = await facultyAccountSchema.findById(userId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    const imageUrl = req.file
      ? `/uploads/faculty_${userId}/${req.file.filename}`
      : null; // Use existing image if no new image is uploaded

    let basicInfo = faculty.basicInfo
      ? await basicInformationSchema.findById(faculty.basicInfo)
      : new basicInformationSchema();
    basicInfo.set({
      ...basic_information,
      ...(imageUrl && { profile_image: imageUrl }),
    });

    let professionalInfo = faculty.professionalInfo
      ? await professionalInformationSchema.findById(faculty.professionalInfo)
      : new professionalInformationSchema();
    professionalInfo.set(professional_information);

    let addressInfo = faculty.addressInfo
      ? await addressDetailsSchema.findById(faculty.addressInfo)
      : new addressDetailsSchema();
    addressInfo.set(address_details);

    let optionalQuestionsInfo = faculty.optionalQuestionsInfo
      ? await optionalQuestionsSchema.findById(faculty.optionalQuestionsInfo)
      : new optionalQuestionsSchema();
    optionalQuestionsInfo.set(optional_questions);

    await basicInfo.save();
    await professionalInfo.save();
    await addressInfo.save();
    await optionalQuestionsInfo.save();

    faculty.basicInfo = basicInfo._id;
    faculty.professionalInfo = professionalInfo._id;
    faculty.addressInfo = addressInfo._id;
    faculty.optionalQuestionsInfo = optionalQuestionsInfo._id;
    faculty.profileCompleted = true;

    await faculty.save();

    res.status(201).send({ message: "All details inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error inserting details" });
  }
};

async function handleFacultyLogin(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await facultyAccountSchema.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    if (!existingUser.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Update last login timestamp
    await facultyAccountSchema.findByIdAndUpdate(existingUser._id, {
      lastUpdate: Date.now(),
    });

    const secretkey = "Pass@34##";
    const token = jwt.sign({ userId: existingUser._id }, secretkey, {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}

async function handleFacultySignup(req, res) {
  const { email, password, byGoogle } = req.body;

  if (byGoogle) {
    await facultyAccountSchema.insertMany([{ email: email, verified: true }]);

    await basicInformationSchema.insertMany([
      {
        full_name: req.body.name,
      },
    ]);
    // facultyAccountSchema.findByIdAndUpdate
    res.send("Successfull by google");
    // sendVerificationEmail(result[0], res);
  } else {
    const existingUser = await facultyAccountSchema.findOne({ email });

    if (existingUser) {
      res.status(400).send("User already exists!");
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const result = await facultyAccountSchema.insertMany([
        { email, password: hashedPassword, verified: false },
      ]);
      sendVerificationEmail(result[0], res);
    }
  }
}

async function handlePostFacultyProfile(req, res) {
  const userid = req.params.id;
  const existingUser = await facultyAccountSchema.findOne({ _id: userid });
  if (existingUser) {
    insertAllDetails(req, res);
    await facultySchema.findByIdAndUpdate(userid, { profileCompleted: true });
  } else {
    console.log("no user exist");
  }
}

async function handleGetFacultyProfile(req, res) {
  const userId = req.params.id;
  try {
    const facultyWithProfile = await facultyAccountSchema
      .findById(userId)
      .populate([
        { path: "basicInfo" },
        { path: "professionalInfo" },
        { path: "addressInfo" },
        { path: "optionalQuestionsInfo" },
      ]);

    const userDetails = {
      basic_information: facultyWithProfile?.basicInfo?._doc || {},
      professional_information:
        facultyWithProfile?.professionalInfo?._doc || {},
      address_details: facultyWithProfile?.addressInfo?._doc || {},
      optional_questions: facultyWithProfile?.optionalQuestionsInfo?._doc || {},
    };

    const profileComplete = facultyWithProfile?.profileCompleted;
    res.status(200).send({ profileComplete, userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
}

async function handleFacultyAppraisal(req, res) {
  const { id, responses } = req.body;

  try {
    const existingUser = await facultyAccountSchema.findOne({ _id: id });
    if (existingUser) {
      const apprisal = new apprisalSchema({
        facultyId: id,
        responses,
      });
      const savedApprisal = await apprisal.save();
      await facultyAccountSchema.findByIdAndUpdate(
        id,
        {
          apprisalResponses: savedApprisal._id,
        },
        { new: true }
      );

      const pythonProcess = spawn("python", ["script.py"]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      // Capture stderr (standard error) and log it
      pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      // Log if there is an error spawning the Python process
      pythonProcess.on("error", (error) => {
        console.error(`Error running Python script: ${error}`);
      });

      // Log when the process closes
      pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
        res.status(200).json({
          message: "Appraisal submitted successfully",
          apprisal: savedApprisal,
        });
      });
      // res.status(200)
      
    } else {
      console.log("no user exist");
    }
  } catch {
    console.error("Error handling faculty appraisal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleFacultyRec(req, res) {
  const userId = req.params.id;

  try {
    const facultyWithRecCourses = await facultyAccountSchema
      .findById(userId)
      .populate([
        { path: "apprisalResponses" },
        { path: "basicInfo" },
        { path: "professionalInfo" },
      ]);
    // console.log(facultyWithRecCourses.apprisalResponses);

    res.status(200).send({ facultyWithRecCourses });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
}

async function handleVerification(req, res) {
  const { id, secretString } = req.params;
  // console.log(req.params)
  console.log(id);
  try {
    // Find the verification record using the user ID
    const verificationRecord = await emailVerificationSchema.findOne({
      userId: id,
    });
    // console.log(verificationRecord);
    // console.log(verificationRecord);

    if (!verificationRecord) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification link!" });
      // .json({ message: "Your email has been successfully verified!" })
    }

    console.log("okokokok");
    const currentTime = Date.now();
    if (currentTime > verificationRecord.expiredAt) {
      await facultySchema.findByIdAndDelete(id); // Delete user from User schema
      return res
        .status(400)
        .json({ message: "Verification link has expired." });
    }

    // Compare the hashed unique string with the one sent in the URL
    // console.log("okokok", secretString)
    const isMatch = await bcrypt.compare(
      secretString + id,
      verificationRecord.secretString
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid verification link." });
    }

    const user = await facultyAccountSchema.findById(verificationRecord.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    await facultyAccountSchema.findByIdAndUpdate(id, { verified: true });

    // Delete the verification record after successful verification
    await emailVerificationSchema.deleteOne({ _id: verificationRecord._id });

    res
      .status(200)
      .json({ message: "Your email has been successfully verified!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during verification." });
  }
}

async function handleForgetPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await facultySchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    sendResetPasswordEmail(user, res);
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "An error occurred." });
  }
}

async function handleResetPassword(req, res) {
  const { userId, token } = req.params;
  const { newPassword } = req.body;
  // console.log(req.params);
  try {
    const resetPasswordEntry = await resetPasswordSchema.findOne({ userId });
    if (!resetPasswordEntry) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    const isMatch = await bcrypt.compare(token, resetPasswordEntry.resetToken);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid reset token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await facultySchema.findByIdAndUpdate(userId, { password: hashedPassword });

    await resetPasswordSchema.deleteOne({ _id: resetPasswordEntry._id });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "An error occurred." });
  }
}

module.exports = {
  handleFacultyLogin,
  handleFacultySignup,
  handlePostFacultyProfile,
  handleFacultyAppraisal,
  handleGetFacultyProfile,
  handleFacultyRec,
  handleVerification,
  handleForgetPassword,
  handleResetPassword,
  // handleuploadProfilePic,
};
