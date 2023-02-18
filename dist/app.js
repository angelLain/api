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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const app = (0, express_1.default)();
var http = require("http");
app.options('*', cors());
app.set('trust proxy', 1);
const pdf = require('html-pdf');
app.use(cors({ origin: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 8000;
var server = http.createServer(app);
server.listen(PORT, () => {
    console.log("puerto " + PORT);
});
app.post('/pdf', (req, res) => {
    const { html } = req.body;
    pdf.create(html).toFile('archivo.pdf', (err, result) => {
        if (err) {
            res.status(500).send('Error al generar el PDF');
            return;
        }
        const filePath = result.filename;
        res.sendFile(filePath, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=archivo.pdf'
            }
        }, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al enviar el archivo');
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
});
app.post('/crear_pdf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const html = req.body.html;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    let options = { format: 'A4' };
    console.log("pfg");
    let file = { content: html };
    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
        pdfBuffer.sa;
        res.send(pdfBuffer);
    }, (err) => {
        console.log(err);
        res.send(err);
    });
}));
app.get("/prueba", (req, res) => {
    console.log("hola");
    res.status(200).send("hola mundo");
});
app.post("/prueba_2", (req, res) => {
    console.log("hola");
    res.status(200).send(req.body);
});
app.get("/", (req, res) => {
    console.log("hola");
    res.status(200).send("hola mundo");
});
