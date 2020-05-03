import Sequelize from "sequelize";

module.exports = function (sequelize) {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            lastName: Sequelize.STRING,
            email: Sequelize.STRING,
            address: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            role: Sequelize.INTEGER,
        },
        { freezeTableName: true, timestamps: false }
    );
    return User;
};
