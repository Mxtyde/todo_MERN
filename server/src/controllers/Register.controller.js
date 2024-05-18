const { validationResult } = require("express-validator");
// const statusCode = require("../utils/constants");
const jsonGenerate = require("../utils/helpers");
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const user = require("../models/user");
const { statusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const jwt = require("jsonwebtoken");
// const JWT_TOKEN_SECRET = require("../utils/constants");


const Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, send a response with the validation errors
        return res.status(statusCode.VALIDATION_ERROR).json(jsonGenerate(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
    }

    const { name, username, password, email } = req.body;
    try {
        // Check if user or email already exists
        const userExist = await user.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (userExist) {
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "User or email already exists"));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Save user to database
        const result = await user.create({
            name: name,
            email: email,
            password: hashPassword,
            username: username
        });

        const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET)
        // Send success response
        return res.json(jsonGenerate(statusCode.SUCCESS, "Registration successful", {userId:result._id,token:token}));
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "User or email already exists"));

    }
};

module.exports = Register;
