const path                         = require("path");
const nodemailer                   = require("nodemailer");
const handleBars                   = require("nodemailer-express-handlebars");
const nodemailerConfig             = require("../config/nodemailer.json");

var transport = nodemailer.createTransport(nodemailerConfig);

transport.use('compile', handleBars({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

module.exports = transport;