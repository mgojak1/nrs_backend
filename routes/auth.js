require("dotenv").config();
const router = require('express').Router();
const {
  User
} = require("../db");

const ROLE = require('../roles');
const jwt = require('jsonwebtoken');
const validation = require('../validation');
const generateHashPass = require('../generate_pass')


router.post('/register', validation.validateUserRegister, async (req, res) => {
  // Data will alredy be validated
  const user = req.body;
  const hashedPassword = await generateHashPass(user.password);
  console.log(hashedPassword);
  // Insert user into db
  user.password = hashedPassword;
  user.role = ROLE.CLIENT;
  await User.create(user);
  const {password, ... userSend} = user;
  res.send(userSend);
});

router.post('/login', validation.validateUserLogin, async (req, res) => {
  // Return token, user is defined in req
  const token = jwt.sign({user: req.user},process.env.TOKEN_SECRET);
  res.header('Authorization', token);
  const {password, ... userSend} = req.user.dataValues;
  res.send(userSend);
});

module.exports = router;
