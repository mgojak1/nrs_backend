const router = require('express').Router();
const {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Coupon,
  connection,
} = require("../db");

const ROLE = require('../roles');

const validation = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

router.post('/register', validation.validateUserRegister, async (req, res) => {
  // Data will alredy be validated
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  // Insert user into db
  user.password = hashedPassword;
  user.role = ROLE.CLIENT;
  const userDb = await User.create(user);
  res.send(user);
});

router.post('/login', validation.validateUserLogin, async (req, res) => {
  // Return token, user is defined in req
  console.log('Id: ', req.user.id);
  console.log('Role: ',req.user.role);
  const token = jwt.sign({id: req.user.id, role: req.user.role},process.env.TOKEN_SECRET);
  res.header('Authorization', token);
  res.send(req.user);

});

module.exports = router;

