const express           = require("express");
const router            = express.Router();

const Preject           = require("../model/project");

const authMiddleware    =  require("../middlewares/authentication");

router.use(authMiddleware);

router.get("/", async (req, res, next) => {
    res.status(200).send({message:"ok"})
})

module.exports = app => app.use("/projects", router);