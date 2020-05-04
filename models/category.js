const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    const Category = sequelize.define(
        "categories",
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
        },
        { freezeTableName: true, timestamps: false }
    );
    return Category;
};
