"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterRouter = exports.userRouter = exports.authRouter = void 0;
var User_1 = require("./User/User");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return User_1.router; } });
var Converter_1 = require("./Converter/Converter");
Object.defineProperty(exports, "converterRouter", { enumerable: true, get: function () { return Converter_1.router; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_1.router; } });
