const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    const Order = sequelize.define(
        "order",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            orderDate: Sequelize.DATE,
            completed: Sequelize.BOOLEAN,
        },
        { freezeTableName: true, timestamps: false }
    );
    return Order;
};
