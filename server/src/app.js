const express = require("express");
const app = express();
const mongoose = require("mongoose")
const DB_CONNECT = require("./utils/constants.js");
const {apiProtected,apiRoute} = require("./utils/api.js");
const cors = require('cors')
// const apiRoute = require("./utils/api.js");
const AuthMiddleware = require("./middlewares/AuthMiddleware.js");

// mongoose.connect(DB_CONNECT);
mongoose.connect("mongodb+srv://Mxtyde:z1FDdujNTqyQicdf@cluster0.d2pck9h.mongodb.net/TODO_APP_DB");


const port = 8000;

app.use(cors())

app.use(express.json());
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);

app.listen(port,()=>{console.log("server is running on port",port)})