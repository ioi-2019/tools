const bcrypt = require('bcrypt');

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
                throw new Error('Passwords do not match');
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