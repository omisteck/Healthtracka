const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");
const compression = require('compression');
const helmet = require("helmet");
const NOT_FOUND = require("./response/404.response");
var indexRouter = require('./routes/index');
const HttpError = require('./exceptions/http.error');
const baseResponse = require('./response/base.response');
const config = require('./config/keys');
require('dotenv').config({});

const app = express();
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//logging erorrs to a file
app.use(logger('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: accessLogStream
}));

// request compression and security headers
app.use(compression());
app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use('/', indexRouter);

// 404 error handler
app.use(NOT_FOUND);

app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json(
            baseResponse(
                false,
                err.statusCode,
                err.message,
                err.data
            ))
    }
    else {
        return res.status(500).json(
            baseResponse(
                false,
                err.statusCode,
                err.message,
                err.data
            ));
    }
})

module.exports = app;
