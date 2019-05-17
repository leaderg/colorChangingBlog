"use strict";

const PORT = 8080;
const express = require('express');
const app = express();
const vibrant = require('node-vibrant');
const fs = require('fs');
const multer  = require('multer');

var storage = multer.diskStorage(
    {
        destination: './public/uploads',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, "img");
        }
    }
);

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server Initialized on port: ${PORT}.`);
});

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post("/upload", upload.single('image'), function (req, res, next) {
  vibrant.from("./public/uploads/img").getPalette((err, palette) => console.log(palette))
  res.send('<a href="/">Go back</a>');
})