const express = require("express");
const {
  subscribeNewsLetter,
  unSubscribeNewsLetter,
  subscribedEMailID,
} = require("../controllers/newsLetterController");
const { validateNewsLetter } = require("../utils/validation");

const router = express.Router();

router.post("/subscribe-newsletter", validateNewsLetter, subscribeNewsLetter);
router.post("/subscribed-emails", subscribedEMailID);
router.post("/unsubscribe-newsletter", unSubscribeNewsLetter);

module.exports = router;
