import Sequelize from "sequelize";

module.exports = function (sequelize) {
    const Category = sequelize.define(
        "category",
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
