const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página Inicial Questions'
    });
});

router.get("/:id", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página get Questions',
        id: req.params.id
    });
});


router.post("/", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página post Questions'
    });
});

router.put("/:id", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página put Questions',
        id: req.params.id
    });
});

router.patch("/:id", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página patch Questions',
        id: req.params.id
    });
});

router.delete("/:id", (req, res, next) => {
    res.status(200).send({
        mensagem: 'Página delete Questions',
        id: req.params.id
    });
});

module.exports = router;