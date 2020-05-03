import Sequelize from "sequelize";

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
            orderItem: {
                type: Sequelize.INTEGER,
                references: {
                    model: "OrderItem",
                    key: "id",
                },
            },
            user: {
                type: Sequelize.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
            },
            coupon: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Coupon",
                    key: "id",
                },
            },
        },
        { freezeTableName: true, timestamps: false }
    );
    return Order;
};
