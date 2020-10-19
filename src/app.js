const express   = require('express');
const http      = require('http');
const app       = express();

app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'ok, deu certo'
    });
});

app.listen(3000);