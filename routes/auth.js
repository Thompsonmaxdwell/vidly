
const { User } = require("../models/user");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

const mongoose = require("mongoose");
const { use } = require("bcrypt/promises");




// Get Requst
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password");

  const invalidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!invalidPassword)
    return res.status(400).send("Invalid username or password");
  try {

    const token = user.generateAuthToken();
    res.status(200).send(token);

    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return Joi.validate(req, schema);
};

module.exports = router;
