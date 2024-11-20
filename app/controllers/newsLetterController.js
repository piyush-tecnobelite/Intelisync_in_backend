// routes/newsletterRoutes.js
const express = require("express");
const Newsletter = require("../models/NewsLetter");
const nodemailer = require("nodemailer");
// Subscribe to Newsletter
const subscribeNewsLetter = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the email is already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Save the new subscription to the database
    const newSubscription = new Newsletter({
      name,
      email,
    });

    await newSubscription.save();

    // Send thank-you email to the user
      const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const userThankYouMailOptions = {
      from: "pk409678@gmail.com", // your email
      to: email,
      subject: "Thank You for Subscribing!",
      text: `Hello Dear,\n\nThank you for subscribing to our newsletter! We appreciate your interest and will keep you updated with our latest news and updates.\n\nBest regards,\nIntellisync`,
    };

    await transporter.sendMail(userThankYouMailOptions);

    res
      .status(201)
      .json({
        message:
          "Subscribed to the newsletter successfully. Thank you email sent.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Unsubscribe from Newsletter
const unSubscribeNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    if (!existingSubscription) {
      return res
        .status(404)
        .json({ message: "Email is not subscribed to the newsletter." });
    }

    // Remove the subscription from the database
    let data = await Newsletter.deleteOne({ _id: existingSubscription._id });

    res
      .status(200)
      .json({ message: "Unsubscribed from the newsletter successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Subscribed Emails
const subscribedEMailID = async (req, res) => {
  try {
    const subscribedEmails = await Newsletter.find().select("email");

    res.status(200).json({ subscribedEmails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  unSubscribeNewsLetter,
  subscribeNewsLetter,
  subscribedEMailID,
};
