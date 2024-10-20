const facultySchema = require("../models/faculty");
const basicInformationSchema = require("../models/basicInformation");
const professionalInformationSchema = require("../models/professionalInformation");
const addressDetailsSchema = require("../models/addressDetails");
const accountSecuritySchema = require("../models/accountSecurity");
const optionalQuestionsSchema = require("../models/optionalQuestions");
const apprisalSchema = require("../models/apprisal");
const bcrypt = require("bcrypt");

const { spawn } = require("child_process");
const Appraisal = require("../models/apprisal");

const insertAllDetails = async (req, res) => {
  try {
    const { formData } = req.body;
    const userId = req.params.id;
    console.log(req.body);
    const {
      basic_information,
      professional_information,
      address_details,
      account_security,
      optional_questions,
    } = formData;

    const basicInfo = new basicInformationSchema(basic_information);
    const professionalInfo = new professionalInformationSchema(
      professional_information
    );
    const addressInfo = new addressDetailsSchema(address_details);
    const accountSecurityInfo = new accountSecuritySchema(account_security);
    const optionalQuestionsInfo = new optionalQuestionsSchema(
      optional_questions
    );

    const savedBasicInfo = await basicInfo.save();
    const savedProfessionalInfo = await professionalInfo.save();
    const savedAddressInfo = await addressInfo.save();
    const savedAccountSecurityInfo = await accountSecurityInfo.save();
    const savedOptionalQuestionsInfo = await optionalQuestionsInfo.save();

    await facultySchema.findByIdAndUpdate(
      userId,
      {
        basicInfo: savedBasicInfo._id,
        professionalInfo: savedProfessionalInfo._id,
        addressInfo: savedAddressInfo._id,
        accountSecurityInfo: savedAccountSecurityInfo._id,
        optionalQuestionsInfo: savedOptionalQuestionsInfo._id,
      },
      { new: true }
    );

    // Send success response
    res.status(201).send({ message: "All details inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error inserting details" });
  }
};

async function handleFacultyLogin(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  const existingUser = await facultySchema.findOne({ username: username });
  // res.send(existingUser);
  if (existingUser) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (isPasswordMatch) {
      // return res.status(400).send("User already exists!");
      console.log("Logged in successfully");
      const objId = await existingUser._id;
      await facultySchema.findByIdAndUpdate(existingUser._id, {
        lastUpdate: Date.now(),
      });
      res.status(200).send(`Logged in successfully, objID : ${objId}`);
    } else {
      console.log("password not match");
    }
  } else {
    console.log("no user exist");
  }
}

async function handleFacultySignup(req, res) {
  const { email, password, loggedInByGoogle } = req.body;
  // const loginData = req.body;
  if (loggedInByGoogle) {
    await facultySchema.insertMany([{ email}]);
    res.send("Successful");
  } else {
    const existingUser = await facultySchema.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists!");
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await facultySchema.insertMany([{ email, password: hashedPassword }]);
      res.send("Successful");
    }
  }
}

async function handlePostFacultyProfile(req, res) {
  const userid = req.params.id;
  const existingUser = await facultySchema.findOne({ _id: userid });
  if (existingUser) {
    insertAllDetails(req, res);
  } else {
    console.log("no user exist");
  }
}

async function handleGetFacultyProfile(req, res) {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const facultyWithProfile = await facultySchema
      .findById(userId)
      .populate([
        { path: "basicInfo" },
        { path: "professionalInfo" },
        { path: "addressInfo" },
        { path: "accountSecurityInfo" },
        { path: "optionalQuestionsInfo" },
      ]);
    const userDetails = {
      basicInfo: facultyWithProfile?.basicInfo?._doc,
      professionalInfo: facultyWithProfile?.professionalInfo?._doc,
      addressInfo: facultyWithProfile?.addressInfo?._doc,
      accountSecurityInfo: facultyWithProfile?.accountSecurityInfo?._doc,
      optionalQuestionsInfo: facultyWithProfile?.optionalQuestionsInfo?._doc,
    };
    res.status(200).send(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
}

async function handleFacultyAppraisal(req, res) {
  const { id, responses } = req.body;
  // console.log(responses)

  try {
    const existingUser = await facultySchema.findOne({ _id: id });
    if (existingUser) {
      const apprisal = new apprisalSchema({
        facultyId: id,
        responses,
      });
      console.log(apprisal);
      const savedApprisal = await apprisal.save();
      await facultySchema.findByIdAndUpdate(
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
      });
    } else {
      console.log("no user exist");
    }
  } catch {}
}

async function handleFacultyRec(req, res) {
  const userid = req.params.id;

  try {
    const existingUser = await facultySchema.findOne({ _id: userid });

    const responses = await apprisalSchema.findById(
      existingUser.apprisalResponses
    );
    console.log("QQQQ", responses.Recommendations);
    res.send(responses.Recommendations);
  } catch {}
}

module.exports = {
  handleFacultyLogin,
  handleFacultySignup,
  handlePostFacultyProfile,
  handleFacultyAppraisal,
  handleGetFacultyProfile,
  handleFacultyRec,
};
