"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var users_statics_1 = require("./users.statics");
var users_methods_1 = require("./users.methods");
var UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    permission: Number,
    dateOfEntry: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    }
});
UserSchema.statics.findOneOrCreate = users_statics_1.findOneOrCreate;
UserSchema.statics.findByPermission = users_statics_1.findByPermission;
UserSchema.methods.setLastUpdated = users_methods_1.setLastUpdated;
UserSchema.methods.sameLastName = users_methods_1.sameLastName;
exports.default = UserSchema;
