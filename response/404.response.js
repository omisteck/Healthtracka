const baseResponse = require("./base.response");

module.exports = (req, res, next) => {
    let statusCode = 404;
    res.status(statusCode).json(
        baseResponse(
            false,
            statusCode,
            "Not Found",
            "The requested resource could not be found.",

        )
    );
}