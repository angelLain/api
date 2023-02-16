"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require("cors");
var path = require("path");
var html_to_pdf = require("html-pdf-node");
var fs = require("fs");
var app = (0, express_1.default)();
var http = require("http");
var PORT = process.env.PORT || 3977;
var server = http.createServer(app);
app.use(cors({ origin: true }));
app.use(express_1.default.json());
server.listen(PORT, function () {
    console.log("puerto " + PORT);
});
app.post("/crear_pdf", function (req, res) {
    var options = { format: "A4" };
    console.log("pfg4654");
    var file = { content: req.body.html };
    html_to_pdf.generatePdf(file, options).then(function (pdfBuffer) {
        // agregar el encabezado Access-Control-Allow-Origin a la respuesta
        res.send(pdfBuffer);
    }, function (err) {
        res.send(err);
    });
});
app.get("/prueba", function (req, res) {
    console.log("hola");
    res.status(200).send("hola mundo");
});
app.post("/prueba_2", function (req, res) {
    console.log("hola");
    res.status(200).send(req.body);
});
app.get("/", function (req, res) {
    console.log("hola");
    res.status(200).send("hola mundo");
});
