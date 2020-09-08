"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterController = exports.userController = exports.AuthController = void 0;
var User_1 = require("./User/User");
var Converter_1 = require("./Converter/Converter");
var authController_1 = __importDefault(require("./authController"));
exports.AuthController = authController_1.default;
var userController = new User_1.UserController();
exports.userController = userController;
var converterController = new Converter_1.ConverterController();
exports.converterController = converterController;
