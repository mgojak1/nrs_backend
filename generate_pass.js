const bcrypt = require('bcrypt');

module.exports = async function generateHashPassword(password) {
    if (password != null && password.length != 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    return null;
};
