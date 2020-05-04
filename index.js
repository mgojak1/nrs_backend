const express = require("express");
const app = express();
const {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Coupon,
    connection,
} = require("./db");

app.get("/", async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

app.listen(8080);
console.log("Server started on port 8080");

//Querry example
//Where
//const users = await User.findAll({ where: { id: 1 }});
//const users = await User.findAll({ where: { id: 1, name: "name" }});
//Update
//await User.update({ name: "name" }, { where: { id: 1 }});
