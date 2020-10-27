const express           = require("express");
const router            = express.Router();
const authMiddleware    = require("../middlewares/authentication");

router.use(authMiddleware);

router.get("/", (req, res, next) =>{
    return res.status(200).send({ok: true, userId: req.userId});
});

module.exports = app => app.use("/projects", router);