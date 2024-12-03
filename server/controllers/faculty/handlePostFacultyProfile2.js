const addressDetailsSchema = require("../../models/faculty/addressDetails");
const basicInformationSchema = require("../../models/faculty/basicInformation");
const facultyAccountSchema = require("../../models/faculty/facultyAccount");

async function handlePostFacultyProfile2(req, res) {
  const userId = req.params.id;
  const selectedSection = req.params.selectedSection;

  const faculty = await facultyAccountSchema.findById(userId);
  if (!faculty) {
    return res.status(404).json({ message: "Faculty not found" });
  }

  if (selectedSection === "basic_information") {
    console.log("okoo")
    try {
      let basicInfo = faculty.basicInfo
        ? await basicInformationSchema.findById(faculty.basicInfo)
        : new basicInformationSchema();

      const { basic_information } = req.body;
      basicInfo.set(basic_information);
      await basicInfo.save();
      faculty.basicInfo = basicInfo._id;
      await faculty.save();
      res.status(201).send({ message: "All details inserted successfully." });
    } catch(error) {
      console.error(error);
      res.status(500).send({ error: "Error inserting details" });
    }
  } else if (selectedSection === "address_details") {
    try {
      let addressInfo =  await addressDetailsSchema.findById(faculty.addressInfo)
        
      const { address_details } = req.body;
      addressInfo.set(address_details);
      await addressInfo.save();
      faculty.addressInfo = addressInfo._id;
      await faculty.save();
      res.status(201).send({ message: "All details inserted successfully." });
    } catch(error) {
      console.error(error);
      res.status(500).send({ error: "Error inserting details" });
    }
  }
}

module.exports = handlePostFacultyProfile2;
