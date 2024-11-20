const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");
const nodemailer = require("nodemailer");
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }


    // Save the OTP to the user's document (you may want to store it securely)
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    // Send the OTP to the user's email
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "pk409678@gmail.com", // your email
      to: email,
      subject: "Welcome to Intellisync",
      text: `Thank you for signing up on our website! Your login credentials are as follows: Email: ${email} and Password : ${password}`,
    };

    const data = await transporter.sendMail(mailOptions);
    console.log(data);
    res.status(200).json({
      message: "Signup successful. Login credentials sent to your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding  the user by email
    const user = await User.findOne({ email });

    // Checking if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // access token and refresh token
      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        message: "logIn successfully",
        accessToken,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }

    // If OTP is correct, update the user's password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;

    await user.save();

    // Send the OTP to the user's email
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "pk409678@gmail.com", // your email
      to: email,
      subject: "Password Reset on Intellisync",
      text: `Your new login credentials are as follows: Email: ${email} and Password : ${new_password}`,
    };

    const data = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset successfully, credentials sent  to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    // Retrieve the token from the request headers or body
    const token = req.headers.authorization || req.body.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not provided." });
    }

    // Decode the token to get user information
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // replace 'your_secret_key' with your actual secret key

    // Send a response indicating successful logout
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  logIn,
  resetPassword,
  logout,
};
