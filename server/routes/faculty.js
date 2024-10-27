const express = require("express");
const {
  handleFacultyLogin,
  handleFacultySignup,
  handlePostFacultyProfile,
  handleGetFacultyProfile,
  handleFacultyAppraisal,
  handleFacultyRec,
  handleVerification,
  handleForgetPassword,
  handleResetPassword
} = require("../controllers/faculty");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ok");
});
router.post("/login", handleFacultyLogin);
router.post("/signup", handleFacultySignup);
router.get("/profile/:id", handleGetFacultyProfile);
router.post("/profile/:id", handlePostFacultyProfile);
router.post("/apprisal", handleFacultyAppraisal);
router.get("/facultyrec/:id", handleFacultyRec);
router.get("/verify/:id/:secretString", handleVerification);
router.post("/forgot-password", handleForgetPassword);
router.post("/reset-password/:userId/:token", handleResetPassword);

module.exports = router;
