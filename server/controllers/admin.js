const adminSchema = require("../models/admin");
const facultySchema = require("../models/xfacultys");
const bcrypt = require("bcrypt");

const insertAllDetails = async (req, res) => {
  try {
    const { formData } = req.body;
    const userId = req.params.id;
    // console.log("id" , req.params.id)
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

async function handleAdminLogin(req, res) {
  const { username, password } = req.body;
  // console.log(req.body)
  const existingAdmin = await adminSchema.findOne({ username: username });
  // res.send(existingUser);
  if (existingAdmin) {
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (isPasswordMatch) {
      // return res.status(400).send("User already exists!");
      console.log("Logged in successfully");
      const objId = await existingAdmin._id;
      const username = await existingAdmin.username;
      res.status(200).send({objId, username});
    } else {
      console.log("password not match");
      res.status(400).send(`user not exist`);
    }
  } else {
    console.log("no user exist");
    res.status(400).send(`user not exist`);
  }
}

async function handleAdminSignup(req, res) {
  const { username, password } = req.body;
  // const loginData = req.body;
  console.log(req.body)

  const existingAdmin = await adminSchema.findOne({ username: username });

  if (existingAdmin) {
    return res.status(400).send("Username already exists!");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await adminSchema.insertMany([{ username, password: hashedPassword }]);
    // const admin = new adminSchema({username, password});
    // await admin.save();
    res.send("Successful");
  }
}

async function handleFaculties(req, res) {
  const faculties = await facultySchema.find().select('-password');
  console.log(faculties);
  res.status(200).send(faculties);
}

async function handleGetFacultyProfile(req, res) {
  const userId = req.params.id;

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
      basicInfo: facultyWithProfile.basicInfo._doc,
      professionalInfo: facultyWithProfile.professionalInfo._doc,
      addressInfo: facultyWithProfile.addressInfo._doc,
      accountSecurityInfo: facultyWithProfile.accountSecurityInfo._doc,
      optionalQuestionsInfo: facultyWithProfile.optionalQuestionsInfo._doc,
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
    } else {
      console.log("no user exist");
    }
  } catch {}
}

module.exports = {
  handleAdminLogin,
  handleAdminSignup,
  handleFaculties
  // handlePostFacultyProfile,
  // handleFacultyAppraisal,
  // handleGetFacultyProfile,
};
