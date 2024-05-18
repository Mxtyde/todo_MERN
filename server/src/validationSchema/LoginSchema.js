const {body} = require('express-validator');

const LoginSchema = [
    body("username","username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should be alphanumeric character only")
    .trim()
    .isLength({min: 6, max:32}),

    body("password","password is required")
    .exists()
    .isLength({min:6 , max: 100})
    .trim(),
];

module.exports = LoginSchema;