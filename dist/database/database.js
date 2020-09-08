"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var Database = /** @class */ (function () {
    function Database() {
    }
    return Database;
}());
exports.default = Database;
var _a = process.env, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_PATH = _a.MONGO_PATH;
connect();
