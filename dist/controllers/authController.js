"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res) {
        res.render('login', { layout: 'auth' });
    };
    return AuthController;
}());
exports.default = new AuthController();
