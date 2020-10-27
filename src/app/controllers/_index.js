const express       = require("express");
const router        = express.Router();

const fs                = express("fs");
const path              = express("path");

module.exports = app => {
    fs.readdirSync(__dirname)
      .filter( file => ( file.indexOf(".") !== 0 && ( file !== "index.js") && ( file !== "_index.js")))
      .foreach( file => require( path.resolve(__dirname, file) )(app)
}
