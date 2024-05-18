const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helpers");
const { statusCode } = require("../utils/constants");
const Todo = require("../models/Todo");
const user = require("../models/user");

const RemoveTodo = async (req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",error.mapped()));

    }
    try {
        const result = await Todo.findOneAndDelete({
            userId: req.userId,
            _id:req.body.todo_id,
        });
        if(result){
            const User = await user.findOneAndUpdate({
                _id:req.userId,
            },{$pull:{todos: req.body.todo_id}}
          );
          res.json(jsonGenerate(statusCode.SUCCESS,"todo deleted",null));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"could not deleted",null))
    }
}

module.exports = RemoveTodo;