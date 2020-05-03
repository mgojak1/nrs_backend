import Sequelize from "sequelize";

module.exports = function (sequelize) {
    const OrderItem = sequelize.define(
        "orderItem",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: Sequelize.INTEGER,
            product: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
        },
        { freezeTableName: true, timestamps: false }
    );
    return OrderItem;
};
