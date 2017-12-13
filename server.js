const fs = require('fs');
const express = require('express');
const app = express();
const jsonEditor = require('./api/jsoneditor/core.js');

jsonEditor(app, "jsonEditor", "./data/diagram.json", "./api/jsoneditor/public");

app.use("/data/", express.static("data"));
app.use(express.static("ui"));

app.listen(80, () => console.log('Nalarkreasi Diagram backend server started'));