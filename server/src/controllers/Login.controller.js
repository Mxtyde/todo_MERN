const { validationResult } = require("express-validator");
const user = require("../models/user");
const jsonGenerate = require("../utils/helpers");
const { statusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
// const bcrypt = require("bcryptjs");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { json } = require("express");


const Login = async (req,res) =>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        const {username,password}=req.body;
        const User = await user.findOne({username:username});

        if(!User){
          return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"username or password is incorrect"));
        }
        const verified = bcrypt.compareSync(password,User.password)
        // User is sus
        if(!verified){
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"username or password is incorrect"));
        }
        
        const token = jwt.sign({userId:User._id},JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(statusCode.SUCCESS,"Login successful",{userId:User._id,token:token}))
    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"validation error",errors.mapped));
}

module.exports = Login;