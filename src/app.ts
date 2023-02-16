import express from "express";
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const app = express();
var http = require("http");
const PORT = process.env.PORT || 3977;
var server = http.createServer(app);

app.use(cors({ origin: true }));
app.use(express.json());

server.listen(PORT, () => {
  console.log("puerto " + PORT);
});

app.post("/crear_pdf", (req, res) => {
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
