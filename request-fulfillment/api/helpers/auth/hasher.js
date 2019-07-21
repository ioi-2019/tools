const bcrypt = require('bcrypt');
const { errors } = require('../constants');
const AppError = require('../errors/app-error');

const hashPassword = (password) => {
    return bcrypt.genSalt()
        .then((salt) => {
            return bcrypt.hash(password, salt);
        })
        .then((hash) => {
            return Promise.resolve(hash);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const checkPassword = (password, hash) => {
    return bcrypt.compare(password, hash)
        .then((authenticated) => {
            if (authenticated === true) {
                return Promise.resolve();
            } else {
                throw new AppError(errors.ERR_PASSWORD_MISMATCH);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};


module.exports = {
    hashPassword,
    checkPassword
};