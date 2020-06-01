const Sequelize = require("sequelize");

//const sequelize = new Sequelize("NRSTim1", "root", "root", {
//    host: "127.0.0.1",
//    dialect: "mysql",
//    logging: false,
//});

const connection = new Sequelize("NRSTim1", "root", "root", {
    host: "db.db",
    dialect: "sqlite",
    logging: false, //console.log
});

const db = {};
db.connection = connection;

//Model imports
db.User = connection.import(__dirname + "/models/user.js");
db.Category = connection.import(__dirname + "/models/category.js");
db.Coupon = connection.import(__dirname + "/models/coupon.js");
db.Product = connection.import(__dirname + "/models/product.js");
db.OrderItem = connection.import(__dirname + "/models/orderItem.js");
db.Order = connection.import(__dirname + "/models/order.js");

const { User, Category, Coupon, Product, OrderItem, Order } = db;

Category.hasOne(Product);
Product.belongsTo(Category);

Product.hasOne(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem, {
    onDelete: "cascade"
})
OrderItem.belongsTo(Order) 

User.hasOne(Order);
Order.belongsTo(User);

Coupon.hasOne(Order);
Order.belongsTo(Coupon);

module.exports = db;
