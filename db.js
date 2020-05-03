import Sequelize from "sequelize";
const sequelize = new Sequelize("NRSTim1", "root", "root", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
});
//Za rad na lokalnoj bazi
//const sequelize = new Sequelize("NRSTim1","root","root",{ host:'db.db', dialect:"sqlite", logging: false });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Model imports
db.user = sequelize.import(__dirname + "/models/user.js");
db.category = sequelize.import(__dirname + "/models/category.js");
db.coupon = sequelize.import(__dirname + "/models/coupon.js");
db.product = sequelize.import(__dirname + "/models/product.js");
db.orderItem = sequelize.import(__dirname + "/models/orderItem.js");
db.order = sequelize.import(__dirname + "/models/order.js");

//Product - Category
db.product.belongsTo(db.category, {
    as: "category",
    foreignKey: "productCategory",
});
db.category.hasOne(db.product, { foreignKey: "productCategory" });

//Product - OrderItem
db.product.belongsTo(db.orderItem, {
    as: "orderItem",
    foreignKey: "orderItemProduct",
});
db.orderItem.hasOne(db.product, { foreignKey: "orderItemProduct" });

//Order - OrderItem
db.order.hasMany(db.orderItem, { foreignKey: "item" });
db.orderItem.belongsTo(db.order, { as: "orderItem", foreignKey: "item" });

//Order - User
db.user.belongsTo(db.order, { foreignKey: "orderUser" });
db.order.hasOne(db.user, { as: "user", foreignKey: "orderUser" });

//Order - Coupon
db.coupon.belongsTo(db.order, { foreignKey: "orderCoupon" });
db.order.hasOne(db.coupon, { as: "user", foreignKey: "orderCoupon" });

export default db;
