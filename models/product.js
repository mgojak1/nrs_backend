const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    const Product = sequelize.define(
        "product",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            price: Sequelize.REAL,
        },
        { freezeTableName: true, timestamps: false }
    );
    return Product;
};
