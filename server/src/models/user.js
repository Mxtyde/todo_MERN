const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        min:6,
        max:32,
        required:true
    },
    username:{
        type:String,
        min:6,
        max:32,
        required:true
    },
    password:{
        type:String,
        min:6,
        max:32,
        required:true
    },
    email:{
        type:String,
        min:6,
        max:32,
        required:true
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }],
    date:{
        type:Date,
        default:Date.now

    }
})

module.exports = mongoose.model("User",userSchema)