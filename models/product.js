import Sequelize from "sequelize";

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
            category: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Category",
                    key: "id",
                },
            },
        },
        { freezeTableName: true, timestamps: false }
    );
    return Product;
};
