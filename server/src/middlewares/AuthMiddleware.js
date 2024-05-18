const { statusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const jsonGenerate = require("../utils/helpers");
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    if (req.headers['auth'] === undefined) {
        return res.json(jsonGenerate(statusCode.AUTH_ERROR, "Access denied"));
    }

    const token = req.headers['auth'];
    try {
        const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
        req.userId = decoded.userId;
        console.log('User ID:', req.userId);
        next()
    } catch (error) {
        console.error('Error:', error);
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid Token"));
    }
}

module.exports = AuthMiddleware;
