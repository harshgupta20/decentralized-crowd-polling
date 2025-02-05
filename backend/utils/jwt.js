const jwt = require('jsonwebtoken');
require('dotenv').config();

const signJwt = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET);
    }
    catch (error) {
        throw error;
    }
}

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { signJwt, verifyJwt };