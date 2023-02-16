import express from "express";
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const app = express();
app.options('*', cors());
app.set('trust proxy', 1);
app.use(cors({ origin: true }));
app.use(express.json());
var http = require("http");
const PORT = process.env.PORT || 8000;
var server = http.createServer(app);

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
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.send(pdfBuffer);
    },
    (err: any) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.send(err);
    }
  );
});

app.get("/prueba", (req, res) => {
  console.log("hola");

  res.status(200).send("hola mundo");
});

app.get("/", (req, res) => {
  console.log("hola");

  res.status(200).send("hola mundo");
});


