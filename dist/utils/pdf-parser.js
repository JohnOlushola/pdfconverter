"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.another = void 0;
var pdf_parse_1 = __importDefault(require("pdf-parse"));
function parsePDF(buffer) {
    // default render callback
    function render_page(pageData) {
        //check documents https://mozilla.github.io/pdf.js/
        var render_options = {
            //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            normalizeWhitespace: false,
            //do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: false
        };
        return pageData.getTextContent(render_options)
            .then(function (textContent) {
            var row = [];
            var lastY, text = '';
            for (var _i = 0, _a = textContent.items; _i < _a.length; _i++) {
                var item = _a[_i];
                if (lastY == item.transform[5] || !lastY) {
                    text += item.str;
                }
                else {
                    text += '\n' + item.str;
                }
                lastY = item.transform[5];
            }
            console.log(text);
            return text;
        });
    }
    var options = {
        pagerender: render_page
    };
    return new Promise(function (resolve, reject) {
        pdf_parse_1.default(buffer, options)
            .then(function (data) {
            // console.log(data)
            resolve(data);
        })
            .catch(function (e) {
            console.log(e);
            reject(e);
        });
    });
}
exports.default = parsePDF;
function another(file) {
    var pdf = require("pdf.js");
    pdf.getDocument(file)
        .then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            page.getTextContent().then(function (txt) {
                console.log(txt);
                // var arrayOfText = items.map(function (item: { str: any; }) {
                //     return item.str;
                // });
            });
        });
    });
}
exports.another = another;
