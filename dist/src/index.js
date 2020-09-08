"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./config/constants");
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var logger_1 = __importDefault(require("./middleware/logger"));
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var index_1 = require("./routes/index");
var app = express_1.default();
app.use(express_1.default.json());
// routes
app.use('/users', index_1.userRouter);
app.use('/convert', index_1.converterRouter);
app.get('/', function (req, res) {
    res.render('home');
});
// views
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
// app.enable('view cache');
// static
app.use(express_1.default.static('assets'));
// middlewares
app.use(logger_1.default);
app.use(body_parser_1.default.json());
// validation
validateEnv_1.default();
// db connection
var _a = process.env, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_PATH = _a.MONGO_PATH;
mongoose_1.default.connect("mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + MONGO_PATH, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
var dbConnection = mongoose_1.default.connection;
dbConnection.once('open', function () {
    console.log('DB connection successful');
});
app.listen(constants_1.PORT, function () {
    console.log("Server is listening on port " + constants_1.PORT);
});
