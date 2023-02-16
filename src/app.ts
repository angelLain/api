import express from "express";
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const app = express();
var http = require("http");
var server = http.createServer(app);
server.listen(8000);
app.use(cors({ origin: true, credentials: true }));

app.get("/crear_pdf", (req, res) => {
  let options = { format: "A4" };
  console.log("pfg4654");
  let file = { content: req.body.html };
  html_to_pdf.generatePdf(file, options).then(
    (pdfBuffer: any) => {
      // agregar el encabezado Access-Control-Allow-Origin a la respuesta
      res.send(pdfBuffer);
    },
    (err: any) => {
      res.send(err);
    }
  );
});
