const express           = require('express');
const bodyParser        = require("body-parser");
const http              = require('http');
const app               = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require("./controllers/authController")(app)


app.get("/", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página Inicial da api'
    });
});


app.listen(3000);