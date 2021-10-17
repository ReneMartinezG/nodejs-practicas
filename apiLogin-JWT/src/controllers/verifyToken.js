/*jshint esversion: 8 */
const jwt = require("jsonwebtoken");

function verifyToken (req,res,next){
    const token = req.headers["x-access-token"];
    
    if(!token){
        return res.status(401).json({
            auth: false,
            message: "No Token Provided"
        });
    }
    //se le pasa la misma "llave" que cuendo se creo el token
    //Deveria ser con variables de entorno
    const decoded = jwt.verify(token,"secretText");
    //las rutas accederan al token desde req.userId
    //asi se pueden protejer varias rutas facilmente
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;