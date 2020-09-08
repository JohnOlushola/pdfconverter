"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
exports.router = express_1.default.Router({
    strict: true,
});
exports.router.post("/upload", function (req, res) {
    controllers_1.converterController.write(req, res);
});
exports.router.get("/", function (req, res) {
    controllers_1.converterController.index(req, res);
});
exports.router.get("/download", function (req, res) {
    controllers_1.converterController.readView(req, res);
});
exports.router.get("/download/file", function (req, res) {
    controllers_1.converterController.read(req, res);
});
