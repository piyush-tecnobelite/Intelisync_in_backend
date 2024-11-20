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

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Running</title>
        <style>
            body {
                margin: 0;
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }
            .container {
                text-align: center;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                padding: 40px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: #ffffff;
            }
            p {
                font-size: 1.2rem;
                color: #e0e0e0;
                margin-bottom: 2rem;
            }
            a {
                text-decoration: none;
                color: #ffffff;
                background: #ff7e5f;
                padding: 0.7rem 1.5rem;
                border-radius: 5px;
                font-weight: bold;
                transition: all 0.3s;
            }
            a:hover {
                background: #feb47b;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Intelisync Server is Running!</h1>
            <p>The Node.js server is up and serving beautifully.</p>
            <a href="https://api.intelisync.in">Visit API</a>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.use("/user", authRoutes);
app.use("/", contactUsRoutes);
app.use("/", newsletterRoutes);

// Starting Server

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server running on port", port);
});
