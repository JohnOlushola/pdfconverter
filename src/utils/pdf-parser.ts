import fs from 'fs';
import pdf from 'pdf-parse';

export default function parsePDF(buffer: Buffer) {
    // default render callback
    function render_page(pageData: {
        getTextContent: (arg0: {
            //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            normalizeWhitespace: boolean;
            //do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: boolean;
        }) => Promise<any>;
    }) {
        //check documents https://mozilla.github.io/pdf.js/
        let render_options = {
            //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            normalizeWhitespace: false,
            //do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: false
        }

        return pageData.getTextContent(render_options)
            .then(function (textContent) {
                let row: any = [];
                let lastY, text = '';
                for (let item of textContent.items) {
                    if (lastY == item.transform[5] || !lastY) {
                        text += item.str;
                    }
                    else {
                        text += '\n' + item.str;
                    }
                    lastY = item.transform[5];
                }
                console.log(text)
                return text;
            });
    }

    let options: any = {
        pagerender: render_page
    }

    return new Promise((resolve, reject) => {
        pdf(buffer, options)
            .then((data: { numpages: any; numrender: any; info: any; metadata: any; version: any; text: any; }) => {
                // console.log(data)
                resolve(data);
            })
            .catch((e: any) => {
                console.log(e)
                reject(e);
            })
    })
}

export function another(file: string) {
    let pdf = require("pdf.js");
    pdf.getDocument(file)
        .then(function (pdf: { getPage: (arg0: number) => Promise<any>; }) {
            pdf.getPage(1).then(function (page: { getTextContent: () => Promise<any>; }) {
                page.getTextContent().then(function (txt: any) {
                    console.log(txt)
                    // var arrayOfText = items.map(function (item: { str: any; }) {
                    //     return item.str;
                    // });
                });
            });
        });
}