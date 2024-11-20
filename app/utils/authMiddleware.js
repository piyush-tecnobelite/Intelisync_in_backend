const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errorHandler");

const authenticateToken = (req, res, next) => {
  try {
    // checking token exist in header
    if (!req.headers.authorization)
      return res.json({ error: "please provide token" });

    //token verification for private endpoints

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};


module.exports = { authenticateToken };
