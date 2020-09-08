"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_model_1 = require("../database/users/users.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = [
                    { firstName: "Olushola", lastName: "Awoyemi", email: "sholaawoyemi@joawoyemiandco.com", password: 'shola01', permission: 0, dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Temiloluwa", lastName: "Olushola", email: "office@joawoyemiandco.com", permission: 0, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Bamidele", lastName: "Ilo", email: "bamideleilo@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Seun", lastName: "Aina", email: "seunaina@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Alonge", lastName: "Idowu", email: "idowualonge@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Toyin", lastName: "Faleye", email: "faleyetoyin@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Femi", lastName: "Olayiwola", email: "femiolayiwola@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Janet", lastName: "James", email: "janetjames@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Victoria", lastName: "Onibonoje", email: "onibonojevictoria@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Opeyemi", lastName: "Momoh", email: "opeyemimomoh@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Ronke", lastName: "Agbaje", email: "ronkeagbaje@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Tosin", lastName: "Eketunde", email: "tosineketunde@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                    { firstName: "Wumi", lastName: "Olagbaju", email: "wumiolagbaju@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
                ];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                user.password = bcrypt_1.default.hashSync(user.password, 'convert');
                return [4 /*yield*/, users_model_1.UserModel.create(user)
                        .then(function (user) {
                        console.log("Created user " + user.firstName + " " + user.lastName);
                    })
                        .catch(function (e) {
                        console.log(e);
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
