const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    const Coupon = sequelize.define(
        "coupon",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            expiryDate: Sequelize.DATE,
            code: Sequelize.STRING,
            discount: Sequelize.REAL,
            used: Sequelize.BOOLEAN,
        },
        { freezeTableName: true, timestamps: false }
    );
    return Coupon;
};
