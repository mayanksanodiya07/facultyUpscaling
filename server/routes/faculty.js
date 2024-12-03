const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  handleFacultyLogin,
  handleFacultySignup,
  handlePostFacultyProfile,
  handleGetFacultyProfile,
  handleFacultyAppraisal,
  handleFacultyRec,
  handleVerification,
  handleForgetPassword,
  handleResetPassword,
  // handleuploadProfilePic,
} = require("../controllers/faculty");
const handlePostFacultyProfile2 = require("../controllers/faculty/handlePostFacultyProfile2");


const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const userId = req.params.id;
      const facultyFolder = path.join(
        __dirname,
        `../uploads/faculty_${userId}`
      );
      try {
        await fs.promises.mkdir(facultyFolder, { recursive: true });

        // Check if the faculty already has an image uploaded
        const existingImagePath = path.join(facultyFolder, "profile.jpg");

        // If an image already exists, delete it
        if (fs.existsSync(existingImagePath)) {
          fs.unlinkSync(existingImagePath); // Delete the existing file
        }

        // Set the destination to the faculty's folder
        cb(null, facultyFolder);
      } catch (error) {
        console.error("Error handling directory or file:", error);
        cb(error, null); // Handle errors creating the folder or deleting the file
      }
    },
    filename: (req, file, cb) => {
      cb(null, "profile.jpg"); // Fixed filename for simplicity or you can generate a unique filename
    },
  }),
}).single("image"); // 'image' is the field name in the form

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ok");
});
router.post("/login", handleFacultyLogin);
router.post("/signup", handleFacultySignup);
router.get("/profile/:id", handleGetFacultyProfile);
router.post("/profile/:id", upload, handlePostFacultyProfile);
router.put("/profile/:id/:selectedSection", handlePostFacultyProfile2);
router.post("/apprisal", handleFacultyAppraisal);
router.get("/facultyrec/:id", handleFacultyRec);
router.post("/verify/:id/:secretString", handleVerification);
router.post("/forgot-password", handleForgetPassword);
router.post("/resets-password/:userId/:token", handleResetPassword);
// router.post("/upload-profile-pic/:id", upload, handleuploadProfilePic);

module.exports = router;
