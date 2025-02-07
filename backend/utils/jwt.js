const jwt = require('jsonwebtoken');

const signJwt = (data, jwt_secret) => {
    try {
        return jwt.sign(data, jwt_secret, { expiresIn: '1d' });
    }
    catch (error) {
        throw error;
    }
}

const verifyJwt = (token, jwt_secret) => {
    try {
        return jwt.verify(token, jwt_secret);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { signJwt, verifyJwt };