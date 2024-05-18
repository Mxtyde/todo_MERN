const { validationResult } = require("express-validator");
const { statusCode } = require("../utils/constants");
const Todo = require("../models/Todo");
const jsonGenerate = require("../utils/helpers");

const MarkTodo = async (req,res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(statusCode.VALIDATION_ERROR,"todo id is required",error.mapped());
    }

    try {
        const todo = await Todo.findOneAndUpdate({
            _id:req.body.todo_id, //todo_id here should be lower case as well as in body
            userId: req.userId,
        },[
            {
                $set:{
                    isCompleted:{
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ]);
        if(todo){
            return res.json(jsonGenerate(statusCode.SUCCESS,"updated",todo));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"could not update",null));
    }
}

module.exports = MarkTodo ;