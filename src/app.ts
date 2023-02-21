import express from "express";
import multer from "multer";
import bodyParser from 'body-parser';
import { PDFDocumentProxy, PDFPageProxy, PDFWorker } from 'pdfjs-dist';
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs"); 
const app = express();
var http = require("http");
app.options('*', cors());
const upload = multer();
app.set('trust proxy', 1);
const pdf = require('html-pdf');
app.use(cors({ origin: true }));
app.use(express.json());
const PORT = process.env.PORT || 8000;
var server = http.createServer(app);
import stream from 'stream';


app.post("/convert", (req: any, res: any) => {
  // Obtener el HTML del body de la solicitud
  const { html } = req.body;

  // Configurar las opciones para el PDF
  const options = {
    "phantomPath": "./node_modules/phantomjs/bin/phantomjs",
  };

  // Convertir HTML a PDF
  pdf.create(html, options).toFile("output.pdf", (err:any, response:any) => {
    if (err) return console.log(err);
    console.log(response);

    // Devolver el archivo PDF
    setTimeout(() => {
      res.sendFile(response.filename);
    }, 1500);
   
  });
});

// Iniciar el servidor



server.listen(PORT, () => {
  console.log("puerto " + PORT);
});





app.post('/pdf', (req, res) => {
  const { html } = req.body;

  pdf.create(html).toFile('archivo.pdf', (err:any, result:any) => {
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

      fs.unlink(filePath, (err:any) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});


app.post('/crear_pdf', async (req, res) => {
  const html = req.body.html;
 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
let options = { format: 'A4' };
let file = { content: html};

html_to_pdf.generatePdf(file, options).then((pdfBuffer:any) => {
  res.send(pdfBuffer)
},(err:any)=>{
  console.log(err);
  
  res.send(err);
});

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
