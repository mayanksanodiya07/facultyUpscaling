const express = require("express");
const path = require("path");
const collection = require("./config");
const BasicInformation = require("./BasicInformationSchema");
const ProfessionalInformation = require("./ProfessionalInformationSchema");
const AddressDetails = require("./AddressDetailsSchema");
const AccountSecurity = require("./AccountSecuritySchema");
const OptionalQuestions = require("./OptionalQuestionsSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Collection } = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const insertAllDetails = async (req, res) => {
  try {
    const { userid, formData } = req.body;
    const {
      basic_information,
      professional_information,
      address_details,
      account_security,
      optional_questions,
    } = formData;

    // console.log(req)
    // Insert into each collection separately
    const basicInfoPromise = BasicInformation.create({
      userId: userid,
      ...basic_information,
    });
    const professionalInfoPromise = ProfessionalInformation.create({
      userId: userid,
      ...professional_information,
    });
    const addressDetailsPromise = AddressDetails.create({
      userId: userid,
      ...address_details,
    });
    const accountSecurityPromise = AccountSecurity.create({
      userId: userid,
      ...account_security,
    });
    const optionalQuestionsPromise = OptionalQuestions.create({
      userId: userid,
      ...optional_questions,
    });

    // await Promise.all([basicInfoPromise]);
    await Promise.all([basicInfoPromise, professionalInfoPromise, addressDetailsPromise, accountSecurityPromise, optionalQuestionsPromise]);

    // Send success response
    res.status(201).send({ message: "All details inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error inserting details" });
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await collection.findOne({ username: username });
  if (existingUser) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (isPasswordMatch) {
      // return res.status(400).send("User already exists!");
      console.log("Logged in successfully");
      const objId = await existingUser._id;
      res.status(200).send({ objId });
    } else {
      console.log("password not match");
    }
  } else {
    console.log("no user exist");
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const loginData = req.body;

  const existingUser = await collection.findOne({ username: username });

  if (existingUser) {
    return res.status(400).send("User already exists!");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await collection.insertMany([{ username, password: hashedPassword }]);
    res.send("Successful");
  }
});

app.post("/faculty-profile/:id", async (req, res) => {
  const { formData } = req.body;
  console.log(req.body);
  const userid = req.params.id;
  const existingUser = await collection.findOne({ _id: userid });
  if (existingUser) {
    insertAllDetails(req, res);
  } else {
    console.log("no user exist");
  }
});

app.get("/profiledetails/:id", async (req, res) => {
  const userid = req.params.id;
  // console.log(userid);
  try {
    // const existingUser = await collection.findOne({ username: username });
    const basicInfo = await BasicInformation.findOne({ userId: userid });
    // console.log(basicInfo)
    const professionalInfo = await ProfessionalInformation.findOne({
      userId: userid,
    });
    const addressDetails = await AddressDetails.findOne({ userId: userid });
    const accountSecurity = await AccountSecurity.findOne({ userId: userid });
    const optionalQuestions = await OptionalQuestions.findOne({
      userId: userid,
    });

    const userDetails = {
      basicInfo,
      professionalInfo,
      addressDetails,
      accountSecurity,
      optionalQuestions,
    };
    // console.log(userDetails)
    res.status(200).send(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
});

app.get("/faculty-list", async (req, res) => {
  try {
    const faculties = await collection.find();
    console.log(faculties);

    // console.log(userDetails)
    res.status(200).send(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching user details" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
