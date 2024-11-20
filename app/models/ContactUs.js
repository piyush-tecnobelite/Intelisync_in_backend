// models/ContactUs.js
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  budget: {
    type: String,
  },
  number: {
    type: String,
  },
  message: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
