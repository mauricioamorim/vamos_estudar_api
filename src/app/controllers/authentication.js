const express       = require("express");
const crypto        = require("crypto");
const router        = express.Router();

const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const authConfig    = require("../../config/jsonwebtoken");

const nodemailer    = require("../../modules/nodemailer");

const User          = require("../model/user");

function generateToken(params = {}){
    return token = jwt.sign( params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post("/authenticate", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user)
            return res.status(400).send({ error: "User not found" });

        if(!await bcrypt.compare( password, user.password )) 
            return res.status(400).send({ error: "Password incorrect" });

        user.password = undefined;

        return res.send({ user, token: generateToken({userId: user.id}) });

    } catch ( error ) {
        return res.status(400).send({ error: "Authentication failed" });
    }
})

router.post( "/register", async ( req, res, next ) => {
    const { email } =  req.body;
    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: "User already exists" });

        const user = await User.create( req.body );
        return res.send({ user, token: generateToken({userId: user.id}) });

    } catch ( error ) {
        return res.status(400).send({ error: "Registration failed" });
    }
})

router.post("/forgot_password", async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user)
            return res.status(400).send({ error: "User not found" });
        
        user.password = undefined;

        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours()+ 1);

        await User.findByIdAndUpdate( user.id, 
            {"$set":{ 
                passwordResetToken: token, 
                passwordResetExpires: now
            }})

        nodemailer.sendMail({
            to: email,
            from: "mauricioamorim.contato@gmail.com",
            template: "auth/forgot_password",
            context: { token }
        }, (error) => {
            if(error)
                return console.log(error);
                //return res.status(400).send({ error: "Cannot send forgot password email" });

            return res.status(200).send({message: "Email sended"})
        })
    } catch ( error ) {
        return res.status(400).send({ error: "Erro on forgot password, try again" });
    }
})

module.exports = app => app.use("/auth", router);
