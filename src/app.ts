import express from "express";
const cors = require("cors");
const path = require("path");
var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const app = express();
var http = require("http");
app.options('*', cors());
app.set('trust proxy', 1);
app.use(cors({ origin: true }));
app.use(express.json());
const PORT = process.env.PORT || 8000;
var server = http.createServer(app);


server.listen(PORT, () => {
  console.log("puerto " + PORT);
});

import puppeteer from 'puppeteer';

app.post('/crear_pdf', async (req, res) => {
  const html = req.body.html;
  console.log("pdf");

  if (!html) {
    return res.status(400).send('Missing required parameter: html');
  }

  try {
    const browser = await puppeteer.launch({ ignoreHTTPSErrors: true });
    res.setHeader('Access-Control-Allow-Origin', '*');
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf();
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the PDF');
  }
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
