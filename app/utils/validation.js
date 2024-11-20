const Joi = require("joi");
const { errorHandler } = require("./errorHandler");
const PasswordComplexity = require("joi-password-complexity");
// Validation for user signup
const validateSignUp = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: PasswordComplexity({
        min: 6,
        max: 16,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
      }).required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
const validateNewsLetter = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateConfirmOTP = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: PasswordComplexity({
        min: 6,
        max: 16,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
      }).required(),
      otp: Joi.number().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateResetPass = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      new_password: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateLogIn = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

const validateContactUs = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      subject: Joi.string(),
      budget: Joi.string(),
      number: Joi.number(),
      message: Joi.string(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  validateSignUp,
  validateLogIn,
  validateContactUs,
  validateConfirmOTP,
  validateResetPass,
  validateNewsLetter,
};
