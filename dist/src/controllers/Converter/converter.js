"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterController = void 0;
var CrudController_1 = require("../CrudController");
var fs_1 = __importDefault(require("fs"));
var formidable_1 = __importDefault(require("formidable"));
var PDFParser = require("pdf2json");
var json2xls = require('json2xls');
var pdfParser = new PDFParser();
// import data from '../../../sample';
var ConverterController = /** @class */ (function (_super) {
    __extends(ConverterController, _super);
    function ConverterController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // upload
    ConverterController.prototype.create = function (req, res) {
        new formidable_1.default.IncomingForm().parse(req, function (err, fields, files) {
            if (err) {
                console.error('Error', err);
                throw err;
            }
            console.log('Fields', fields);
            console.log('Files', files);
            for (var _i = 0, _a = Object.entries(files); _i < _a.length; _i++) {
                var file = _a[_i];
                console.log(file);
            }
        });
    };
    // download
    ConverterController.prototype.read = function (req, res) {
        throw new Error("Method not implemented.");
    };
    ConverterController.prototype.update = function (req, res) {
        throw new Error("Method not implemented.");
    };
    ConverterController.prototype.delete = function (req, res) {
        throw new Error("Method not implemented.");
    };
    ConverterController.prototype.convert = function (req, res) {
        res.json({ message: 'successful' });
    };
    ConverterController.prototype.toJSON = function (file) {
        var fileLocation = "./tmp/upload/" + file.name;
        var jsonLocation = "./tmp/json/" + file.name;
        var data;
        pdfParser.loadPDF(fileLocation);
        pdfParser.on("pdfParser_dataError", function (errData) {
            console.error(errData.parserError);
        });
        pdfParser.on("pdfParser_dataReady", function (pdfData) {
            data = pdfData;
            fs_1.default.writeFile(jsonLocation, JSON.stringify(pdfData), function () {
                console.log("Parsing successful. File can be found at " + jsonLocation);
            });
        });
        return {
            originalFileLocation: fileLocation,
            jsonFile: jsonLocation,
            json: data,
        };
    };
    ConverterController.prototype.toExcel = function (jsonFile) {
        var xls = json2xls(jsonFile);
        var filename = Date.now() + "-download";
        try {
            fs_1.default.writeFileSync(filename, xls, "binary");
        }
        catch (e) {
            console.log(e);
        }
    };
    return ConverterController;
}(CrudController_1.CrudController));
exports.ConverterController = ConverterController;
