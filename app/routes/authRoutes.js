const express = require("express");
const {
  signUp,
  logIn,
  resetPassword,
  logout,
} = require("../controllers/authController");
const {
  validateSignUp,
  validateLogIn,
  validateResetPass,
} = require("../utils/validation");

const router = express.Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/logIn", validateLogIn, logIn);
router.post("/resetPassword", validateResetPass, resetPassword);
router.post("/logout", logout);

module.exports = router;
