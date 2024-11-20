// routes/contactRoutes.js
const nodemailer = require("nodemailer");
const ContactUs = require("../models/ContactUs");

// Contact Us
const contact = async (req, res) => {
  try {
    const { name, email, subject, number,budget, message } = req.body;

    // Save the contact message to the database
    const contactMessage = new ContactUs({
      name,
      email,
      budget,
      subject,
      number,
      message,
    });

    await contactMessage.save();

    // Send confirmation email to the user
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use another service (e.g., Outlook, Yahoo)
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const userConfirmationMailOptions = {
      from:  process.env.MAIL_ID,
      to: email,
      subject: "Contact Us Confirmation",
      text: "Thank you for contacting us. We will get back to you soon.",
    };

    const adminMailOptions = {
      from:  process.env.MAIL_ID,
      to: ["techpiyush@gmail.com"], // admin email
      // to: ["javed@intelisync.ai", "praveen@intelisync.ai"], // admin email
      subject: `Contact Us - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\n\nMessage:\n${message}\nBudget:\n${budget}`,
    };

    await transporter.sendMail(userConfirmationMailOptions);
    await transporter.sendMail(adminMailOptions);
    // Send email to administrators

    res.status(200).json({ message: "Contact message sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { contact };
