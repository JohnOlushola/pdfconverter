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
exports.ConverterController = void 0;
var fs_1 = __importDefault(require("fs"));
var formidable_1 = __importDefault(require("formidable"));
var util_1 = require("util");
var xlsx_1 = __importDefault(require("xlsx"));
var pdf_parser_1 = __importDefault(require("../../utils/pdf-parser"));
var PdfReader = require("pdfreader").PdfReader;
var ConverterController = /** @class */ (function () {
    function ConverterController() {
    }
    // view
    ConverterController.prototype.index = function (req, res) {
        var error = req.flash('error')[0];
        var success = req.flash('success')[0];
        res.render('home', {
            title: 'Login',
            message: {
                error: error,
                success: success
            },
        });
    };
    // render download view
    ConverterController.prototype.readView = function (req, res) {
        res.render('download');
    };
    // send download
    ConverterController.prototype.read = function (req, res) {
        try {
            var file = './tmp/download/download.xlsx';
            return res.download(file);
        }
        catch (e) {
            res.render('error', {
                error: {
                    message: "Error retrieving file.",
                    details: e
                }
            });
        }
    };
    // recieve upload and convert
    ConverterController.prototype.write = function (req, res) {
        var _this = this;
        var results, row, buffer;
        var fileType, filePath;
        this.upload(req, function (err, file, multiples) { return __awaiter(_this, void 0, void 0, function () {
            var worksheet, i, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file.type];
                    case 1:
                        // file details
                        fileType = _a.sent();
                        return [4 /*yield*/, file.path];
                    case 2:
                        filePath = _a.sent();
                        if (err) {
                            req.flash('error', 'Upload failed.');
                            return [2 /*return*/, res.redirect('/')];
                        }
                        if (fileType !== 'application/pdf') {
                            req.flash('error', 'Wrong file type, you can only convert .pdf files.');
                            return [2 /*return*/, res.redirect('/')];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 11, , 12]);
                        return [4 /*yield*/, this.readFile(filePath)];
                    case 4:
                        // buffer contains the file content
                        buffer = _a.sent();
                        return [4 /*yield*/, this.readPDFPages(buffer)];
                    case 5:
                        results = _a.sent();
                        // another(filePath);
                        return [4 /*yield*/, pdf_parser_1.default(buffer)];
                    case 6:
                        // another(filePath);
                        _a.sent();
                        worksheet = this.createWorkSheet();
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < results.length)) return [3 /*break*/, 10];
                        result = results[i];
                        return [4 /*yield*/, this.reformat(result)];
                    case 8:
                        row = _a.sent();
                        // add page rows to worksheet
                        this.addToWorkSheeet(worksheet, row);
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10:
                        // add worksheet to workbook and save
                        this.createWorkBookAndSave(worksheet, function (err) {
                            if (err) {
                                req.flash('error', 'An error occured while converting to xls. Please try again.');
                                return res.redirect('/');
                            }
                        });
                        // return
                        res.redirect('/download');
                        return [3 /*break*/, 12];
                    case 11:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.render('error', {
                                error: {
                                    message: "An Error Occured.",
                                    details: e_1
                                }
                            })];
                    case 12: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Helper methods
     */
    // save user's upload
    ConverterController.prototype.upload = function (req, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var file, uploadedFiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = new formidable_1.default.IncomingForm();
                        uploadedFiles = [util_1.isNull];
                        // save to tmp/upload/
                        file.on('fileBegin', function (name, file) {
                            file.path = "./tmp/upload/" + Date.now() + "__" + file.name;
                        });
                        return [4 /*yield*/, file.parse(req, function (err, fields, files) {
                                if (err) {
                                    return callback(err, null, null);
                                }
                                for (var _i = 0, _a = Object.entries(files); _i < _a.length; _i++) {
                                    var file_1 = _a[_i];
                                    uploadedFiles.push(file_1);
                                }
                                return callback(null, files.fileToUpload, uploadedFiles);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // read file
    ConverterController.prototype.readFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs_1.default.readFile(file, function (err, pdfBuffer) {
                            if (err) {
                                reject(err);
                            }
                            resolve(pdfBuffer);
                        });
                    })];
            });
        });
    };
    // parse pdf pages
    ConverterController.prototype.readPDFPages = function (buffer) {
        var reader = new PdfReader();
        return new Promise(function (resolve, reject) {
            var pages = [];
            reader.parseBuffer(buffer, function (err, item) {
                if (err) {
                    reject(err);
                }
                else if (!item) {
                    resolve(pages);
                }
                else if (item.page) {
                    pages.push({});
                }
                else if (item.text) {
                    // create array of array for a row
                    // const toPush = pages[pages.length - 1][item.x] ? pages[pages.length - 1][item.x] : pages[pages.length - 1][item.x];
                    var row = pages[pages.length - 1][item.y] || [];
                    // add text to row array
                    row.push(item.text);
                    // save each row to current page
                    pages[pages.length - 1][item.y] = row;
                }
            });
        });
    };
    // prepare data for conversion
    ConverterController.prototype.reformat = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, rows, adjust, i;
            return __generator(this, function (_a) {
                keys = Object.keys(file);
                rows = [];
                adjust = [];
                for (i = 0; i < keys.length; i++) {
                    if (keys[i + 1] - keys[i] < 0.5750000000000028 && keys[i + 1] - keys[i] > 0.1) {
                        adjust.push({
                            key: keys[i],
                            adjustUp: true,
                            row: file[keys[i]]
                        });
                    }
                    // adjust.push({ key: keys[i], adjustUp: false });
                }
                keys.forEach(function (key) {
                    rows.push(file[key]);
                });
                return [2 /*return*/, rows];
            });
        });
    };
    // create worksheet
    ConverterController.prototype.createWorkSheet = function () {
        try {
            var ws = xlsx_1.default.utils.aoa_to_sheet([["JO Awoyemi & Co."]]);
            return ws;
        }
        catch (e) {
            return e;
        }
    };
    // add data to worksheet
    ConverterController.prototype.addToWorkSheeet = function (ws, page) {
        try {
            xlsx_1.default.utils.sheet_add_aoa(ws, page, { origin: -1 });
        }
        catch (e) {
            return e;
        }
    };
    // create workbook and save
    ConverterController.prototype.createWorkBookAndSave = function (worksheet, callback) {
        try {
            var filename = "tmp/download/download.xlsx";
            var workbook = xlsx_1.default.utils.book_new();
            /* Add the worksheet to the workbook */
            xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Page One");
            // write to file
            xlsx_1.default.writeFile(workbook, filename);
            callback(null);
        }
        catch (e) {
            return callback(e);
        }
    };
    // convert to xlsx file
    ConverterController.prototype.toXLSX = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, workbook, worksheet;
            return __generator(this, function (_a) {
                filename = "tmp/download/download.xlsx";
                try {
                    workbook = xlsx_1.default.utils.book_new();
                    worksheet = xlsx_1.default.utils.aoa_to_sheet(data);
                    /* Add the worksheet to the workbook */
                    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Page One");
                    // write to file
                    xlsx_1.default.writeFile(workbook, filename);
                    callback(null);
                }
                catch (e) {
                    return [2 /*return*/, callback(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    return ConverterController;
}());
exports.ConverterController = ConverterController;
