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
const PORT = process.env.PORT || 3977;
var server = http.createServer(app);
app.use(cors({ origin: true }));
app.use(express_1.default.json());
server.listen(PORT, () => {
    console.log("puerto " + PORT);
});
const puppeteer_1 = __importDefault(require("puppeteer"));
app.get('/crear_pdf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { html } = req.body.html;
    if (!html) {
        return res.status(400).send('Missing required parameter: html');
    }
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setContent(html);
        const pdf = yield page.pdf();
        yield browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the PDF');
    }
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
