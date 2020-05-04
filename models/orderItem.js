const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    const OrderItem = sequelize.define(
        "orderItems",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: Sequelize.INTEGER,
        },
        { freezeTableName: true, timestamps: false }
    );
    return OrderItem;
};
