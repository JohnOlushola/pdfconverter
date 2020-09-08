"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flash(req, res, next) {
    res.locals.success = req.flash('error');
    res.locals.error = req.flash('error');
    next();
}
exports.default = flash;
