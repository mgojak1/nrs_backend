const {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Coupon,
    connection,
  } = require("./db");

const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const userSchemaRegister = Joi.object().keys({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string()
});

const userSchemaLogin = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

async function validateUserRegister (req, res, next) {
    // Validate that data is corretct
    const validation = userSchemaRegister.validate(req.body);
    if (validation.error) res.status(400).send({msg: validation.error.details[0].message});

    // Check if user is alredy in a date base
    const emailExist = await User.findOne({ where: { email: req.body.email.trim()}});
    if (emailExist) res.status(400).send({msg: "User alredy exist!"});

    next();
}

async function validateUserLogin (req, res, next) {
    // Validate that data is correct
    const validation = userSchemaLogin.validate(req.body);
    if (validation.error) res.status(400).send({msg: validation.error.details[0].message});

    // Check if user egsists
    const user = await User.findOne({ where: { email: req.body.email.trim()}});
    if (!user) res.status(400).send({msg: "Email invalid!"});

    // Check password correct
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) res.status(400).send({msg: "Password invalid!"});

    // Add user to request for later
    req.user = user;
    next();
}



module.exports = {
    validateUserRegister: validateUserRegister,
    validateUserLogin: validateUserLogin
}