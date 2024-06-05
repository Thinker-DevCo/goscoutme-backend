"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.BaseError = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["UNAUTORIZED"] = 401] = "UNAUTORIZED";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
class BaseError extends Error {
    constructor(name, httpCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = "internal server error") {
        super(name, httpCode, isOperational, description);
    }
}
exports.APIError = APIError;
class HTTP404Error extends BaseError {
    constructor(description) {
        super("NOT FOUND", HttpStatusCode.NOT_FOUND, true, description);
    }
}
