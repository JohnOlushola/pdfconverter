import express, { Request, Response } from 'express';
import { PORT } from './config/constants';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import 'dotenv/config';

import logger from './middleware/logger';
import viewFlash from './middleware/flash';
import validateEnv from './utils/validateEnv';

import { userRouter, converterRouter, authRouter } from './routes/index';

// setup
const app = express();
app.use(express.json());
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 }, secret: 'secret', resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/', converterRouter);

// views
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
// app.enable('view cache');

// static
app.use(express.static('assets'))

// middlewares
app.use(logger);
app.use(bodyParser.json());

// validation
validateEnv();

// db connection
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
    console.log('DB connection successful');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})