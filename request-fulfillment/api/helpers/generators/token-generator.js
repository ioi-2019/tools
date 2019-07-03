const randomstring = require('randomstring');

const generateAuthToken = () => {
    return generateToken(30);
};

const generateToken = (length) => {
    const token = randomstring.generate(length);
    return token;
};

module.exports = {
    generateAuthToken
};