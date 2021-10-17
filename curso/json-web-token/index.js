/*jshint esversion: 6 */
/*jshint -W069 */
const express = require("express");
const app = express();
const port = 3000;

const jwt = require("jsonwebtoken");
const keys_module = require("./settings/keys.js");
app.set("key",keys_module.key);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("hello !");
});

app.listen(port, (req,res)=>{
    console.log(`Server on port ${port}`);
});

app.post("/login", (req,res)=>{
    if (req.body.usuario=="admin" && req.body.pass=="12345") {
        const playload = {
            ckeck:true
        };

    const token = jwt.sign(playload,app.get("key"),{
        expiresIn:"7d"
    });

    res.json({
        message: "!Autenticacion exitosa !",
        pass: token
    });
    } else{
        res.json({
            message: "password y/o usuario incorrectos",
            
        });
    }
});

const verifacated = express.Router();
verifacated.use((req,res,next)=>{
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    // console.log(token);
    if (!token) {
        res.status(401).send({
            error: "Es necesario un token de autenticacion"
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        console.log(token);
    }

    if(token){
        jwt.verify(token, app.get("key"), (error,decoded)=>{
            if(error){
                return res.json({
                    message: "El token no es valido"
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
});

app.get("/info",verifacated, (req,res)=>{
    res.json("Informacion importante entregada");
});