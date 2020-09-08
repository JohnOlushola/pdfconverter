import { Request, Response } from "express";
import fs, { stat } from 'fs';
import formidable from 'formidable';
import { isNull } from 'util';
import xlsx from 'xlsx';
import pdfParser from '../../utils/pdf-parser';
import parsePDF, {another} from "../../utils/pdf-parser";

const PdfReader = require("pdfreader").PdfReader;

export class ConverterController {
    // view
    public index(req: Request, res: Response) {
        let error = req.flash('error')[0];
        let success = req.flash('success')[0];

        res.render('home', {
            title: 'Login',
            message: {
                error: error,
                success: success
            },
        })
    }

    // render download view
    public readView(req: Request, res: Response) {
        res.render('download');
    }

    // send download
    public read(req: Request, res: Response) {
        try {
            const file = './tmp/download/download.xlsx';
            return res.download(file);
        }
        catch (e) {
            res.render('error',
                {
                    error:
                    {
                        message: "Error retrieving file.",
                        details: e
                    }
                })
        }
    }

    // recieve upload and convert
    public write(req: Request, res: Response) {
        let results: any, row: any, buffer: any;
        let fileType: string, filePath: string;

        this.upload(req, async (err, file, multiples) => {
            // file details
            fileType = await file.type;
            filePath = await file.path

            if (err) {
                req.flash('error', 'Upload failed.');
                return res.redirect('/');
            }

            if (fileType !== 'application/pdf') {
                req.flash('error', 'Wrong file type, you can only convert .pdf files.');
                return res.redirect('/');
            }

            // readFile
            try {
                // buffer contains the file content
                buffer = await this.readFile(filePath);

                results = await this.readPDFPages(buffer);

                // another(filePath);

                await parsePDF(buffer);

                // create worksheets
                let worksheet = this.createWorkSheet();

                // get each page
                for (let i = 0; i < results.length; i++) {
                    let result = results[i];

                    row = await this.reformat(result);

                    // add page rows to worksheet
                    this.addToWorkSheeet(worksheet, row);
                }

                // add worksheet to workbook and save
                this.createWorkBookAndSave(worksheet, (err) => {
                    if (err) {
                        req.flash('error', 'An error occured while converting to xls. Please try again.');
                        return res.redirect('/');
                    }
                })

                // return
                res.redirect('/download');
            }
            catch (e) {
                return res.render('error', {
                    error: {
                        message: "An Error Occured.",
                        details: e
                    }
                });
            }
        })
    }

    /** 
     * Helper methods
     */
    // save user's upload
    private async upload(req: Request, callback: (arg0: null, arg1: any, arg2: Object | null) => any) {
        let file = new formidable.IncomingForm();
        let uploadedFiles: Array<Object> = [isNull];

        // save to tmp/upload/
        file.on('fileBegin', (name, file) => {
            file.path = `./tmp/upload/${Date.now()}__${file.name}`
        });

        await file.parse(req, (err, fields, files) => {
            if (err) {
                return callback(err, null, null);
            }

            for (const file of Object.entries(files)) {
                uploadedFiles.push(file)
            }

            return callback(null, files.fileToUpload, uploadedFiles);
        });

    }

    // read file
    private async readFile(file: string | number | Buffer | import("url").URL): Promise<(NodeJS.ErrnoException | null) | Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, pdfBuffer) => {
                if (err) {
                    reject(err);
                }

                resolve(pdfBuffer);
            });
        })
    }

    // parse pdf pages
    private readPDFPages(buffer: any) {
        const reader = new PdfReader();

        return new Promise((resolve, reject) => {
            let pages: any = [];

            reader.parseBuffer(buffer, (err: any, item: any) => {
                if (err) {
                    reject(err)
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
                    const row = pages[pages.length - 1][item.y] || [];

                    // add text to row array
                    row.push(item.text);

                    // save each row to current page
                    pages[pages.length - 1][item.y] = row;
                }
            })
        })
    }

    // prepare data for conversion
    private async reformat(file: any) {
        // parse result row by row
        const keys: any = Object.keys(file);
        let rows: any = [];

        // correct wrong lines
        let adjust: any = []
        for (let i = 0; i < keys.length; i++) {
            if (keys[i + 1] - keys[i] < 0.5750000000000028 && keys[i + 1] - keys[i] > 0.1) {
                adjust.push({
                    key: keys[i],
                    adjustUp: true,
                    row: file[keys[i]]
                });
            }

            // adjust.push({ key: keys[i], adjustUp: false });
        }


        keys.forEach((key: string | number) => {
            rows.push(file[key]);
        })

        return rows;
    }

    // create worksheet
    private createWorkSheet() {
        try {
            let ws = xlsx.utils.aoa_to_sheet([["JO Awoyemi & Co."]]);
            return ws;
        }
        catch (e) {
            return e;
        }
    }

    // add data to worksheet
    private addToWorkSheeet(ws: xlsx.WorkSheet, page: unknown[][]) {
        try {
            xlsx.utils.sheet_add_aoa(ws, page, { origin: -1 });
        }
        catch (e) {
            return e;
        }
    }

    // create workbook and save
    private createWorkBookAndSave(worksheet: xlsx.WorkSheet, callback: ((arg0: any) => any)) {
        try {
            let filename = `tmp/download/download.xlsx`;
            let workbook = xlsx.utils.book_new();

            /* Add the worksheet to the workbook */
            xlsx.utils.book_append_sheet(workbook, worksheet, "Page One");

            // write to file
            xlsx.writeFile(workbook, filename);

            callback(null)
        }
        catch (e) {
            return callback(e);
        }
    }

    // convert to xlsx file
    private async toXLSX(data: any, callback: ((arg0: any) => any)) {
        let filename = `tmp/download/download.xlsx`;
        try {
            // create workbook
            let workbook = xlsx.utils.book_new();

            // create worksheet
            let worksheet = xlsx.utils.aoa_to_sheet(data);

            /* Add the worksheet to the workbook */
            xlsx.utils.book_append_sheet(workbook, worksheet, "Page One");

            // write to file
            xlsx.writeFile(workbook, filename);

            callback(null)
        }
        catch (e) {
            return callback(e);
        }
    }
}