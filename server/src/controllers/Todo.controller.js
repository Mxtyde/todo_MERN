const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helpers");
const { statusCode } = require("../utils/constants");
const Todo = require("../models/Todo");
const User = require("../models/user");

const createTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Todo is Required", errors.mapped()));
    }

    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });
        console.log(result);
        if (result) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.userId },
                { $push: { todos: result } },
                 // To return the updated document
            );
            return res.json(jsonGenerate(statusCode.SUCCESS, "Todo created successfully", result));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Something went wrong", error));
    }
};

module.exports = createTodo;
