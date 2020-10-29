const jwt           = require("jsonwebtoken");
const authConfig    = require("../../config/jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return res.status(401).send({ error: "No token provided" })
        
        const parts = authHeader.split(" ");
        if(!parts.lenght === 2)
            return res.status(401).send({ error: "Token error" })
    
        const [scheme, token] = parts;
        if(!/^Bearer$/i.test(scheme))
            return res.status(401).send({ error: "Token malformatted" })

        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if(error)
                return res.status(401).send({ error: "Token invalid" })

            res.locals.userId = decoded.userId;
            return next();
        })

    }catch{

    }
};