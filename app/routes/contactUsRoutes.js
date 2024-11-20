const express = require("express");
const { contact } = require("../controllers/contactUsController");

const { validateContactUs } = require("../utils/validation");

const router = express.Router();

router.post("/contact-us", validateContactUs, contact);

module.exports = router;
