const Todo = require("../models/Todo");
const user = require("../models/user");
const { statusCode } = require("../utils/constants");
const jsonGenerate = require("../utils/helpers");

const GetTodos = async (req,res) =>{
    try {
        const list = await user.findById(req.userId)
        .select('-password')
        .populate('todos')
        .exec();
        console.log(list)
        return res.json(jsonGenerate(statusCode.SUCCESS,"All todo list",list));
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Error",error));
    }
}

module.exports = GetTodos ;

