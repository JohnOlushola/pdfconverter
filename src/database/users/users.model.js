"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var users_schema_1 = require("./users.schema");
exports.UserModel = mongoose_1.model("user", users_schema_1["default"]);
