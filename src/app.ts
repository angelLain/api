import express from "express";

const cors = require("cors");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs"); 
const app = express();
var http = require("http"); 
app.options('*', cors());
app.set('trust proxy', 1);
const pdf = require('html-pdf');

app.use(cors({ origin: true }));
app.use(express.json());
const PORT = process.env.PORT || 8000;
var server = http.createServer(app);





app.post("/convert", (req: any, res: any) => {
  console.log("activo pdf");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  
  
  let options = { format: "A4" };
  let file = { content: req.body.html };
  html_to_pdf.generatePdf(file, options).then(
    (pdfBuffer: any) => {
      console.log("se creo pdf");
  
      res.send(pdfBuffer);
    },
    (err: any) => {
      console.log(err);
      
      res.send(err);
    }
  );
  

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


app.post("/geo", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("se activo");
  
  console.log(req.body);
  res.send("hola")
});
