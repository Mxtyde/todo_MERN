const DB_CONNECT = "mongodb+srv://Mxtyde:z1FDdujNTqyQicdf@cluster0.d2pck9h.mongodb.net/TODO_APP_DB";
const JWT_TOKEN_SECRET = "adsnfhndjnusdfmokmvasnuvjaiisniv"
const statusCode = {
    SUCCESS:200,
    VALIDATION_ERROR:201,
    UNPROCESSABLE_ENTITY:202,
    SERVER_ERROR:203,
    AUTH_ERROR:204,
}

module.exports = {
    DB_CONNECT: DB_CONNECT,
    JWT_TOKEN_SECRET: JWT_TOKEN_SECRET,
    statusCode: statusCode,
};