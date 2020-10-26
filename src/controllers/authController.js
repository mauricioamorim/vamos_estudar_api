const express   = require("express");
const bcrypt    = require("bcrypt");

const User      = require("../model/user");

const router    = express.Router();

router.post("/authenticate", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user)
            return res.status(400).send({ error: "User not found" });

        if(!await bcrypt.compare( password, user.password )) 
            return res.status(400).send({ error: "Password incorrect" });

        return res.send({ user });
    } catch ( error ) {
        return res.status(400).send({ error: "Authentication failed" });
    }
});


router.post( "/register", async ( req, res ) => {
    const { email } =  req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: "User already exists" });

        const user = await User.create( req.body );
        return res.send({ user });

    } catch ( error ) {
        return res.status(400).send({ error: "Registration failed" });
    }
});

module.exports = app => app.use("/auth", router);
