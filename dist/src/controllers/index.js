"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterController = exports.userController = void 0;
var User_1 = require("./User/User");
var converter_1 = require("./Converter/converter");
var userController = new User_1.UserController();
exports.userController = userController;
var converterController = new converter_1.ConverterController();
exports.converterController = converterController;
