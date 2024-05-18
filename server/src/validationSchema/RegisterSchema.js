
const {body} = require("express-validator")

const RegisterSchema=[
    body('name').trim().isAlpha().withMessage("Name should be in Alphabets"),
    
    body('username','username is required').exists()
    .isAlphanumeric().withMessage('username should be alphanumeric')
    .trim().isLength({min:6,max:32}),

    body('password','Your password should contain at least 6 characters ').isLength({min:6,max:100}).trim(),

    body('email','email is required').exists().isEmail(),
]

module.exports = RegisterSchema;