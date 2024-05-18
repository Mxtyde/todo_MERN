const express = require("express");
const RegisterSchema = require("../validationSchema/RegisterSchema");
const Register = require("../controllers/Register.controller");
const LoginSchema = require("../validationSchema/LoginSchema");
const Login = require("../controllers/Login.controller");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { check } = require("express-validator");
const createTodo = require("../controllers/Todo.controller");
const GetTodos = require("../controllers/TodoList.controller");
const MarkTodo = require("../controllers/MarkTodo.controller");
const RemoveTodo = require("../controllers/RemoveTodo.controller");

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);
// protected routes
apiProtected.post('/createTodo',[check('desc','Todo desc is required').exists()],createTodo)
// apiRoute.post('/createTodo', AuthMiddleware,createTodo)

apiProtected.post('/marktodo',[check('todo_id','Todo id is required').exists()],MarkTodo)
//todo_id above is in lower case as it is use for validation check and place where we will be entering value in the body it should be in lowercase or same as the validation  

apiProtected.post('/deletetodo',[check('todo_id','Todo id is required').exists()],RemoveTodo)

apiProtected.get('/todolist',GetTodos)

// module.exports = apiProtected;
// module.exports = apiRoute;
module.exports =  {apiRoute, apiProtected} ;