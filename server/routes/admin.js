const express = require("express");
const {
  handleAdminLogin,
  handleAdminSignup,
  handleFaculties
} = require("../controllers/admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ok");
});
router.post("/login", handleAdminLogin);
router.post("/signup", handleAdminSignup);
router.get("/dashboard", handleFaculties);
// console.log("helllo")

module.exports = router;
