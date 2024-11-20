"use strict";
const cors = require("cors"),
  express = require("express"),
  bodyParser = require("body-parser"),
  authRoutes = require("./app/routes/authRoutes"),
  contactUsRoutes = require("./app/routes/contactUsRoutes");
const newsletterRoutes = require("./app/routes/newsLetterRoutes");

require("dotenv").config({ path: "./app/config/config.env" });

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Including database file

require("./app/config/db");

// Including routes

app.use("/user", authRoutes);
app.use("/", contactUsRoutes);
app.use("/", newsletterRoutes);

// Starting Server

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port", port);
});
