/*jshint esversion: 8 */
const express = require("express");
const app = express();
const port = 3000;

const bcryptjs = require("bcryptjs");

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.post("/login", async (req,res)=>{
    //Datos que vamos a cargar a postman
    const user = req.body.user;
    const pass = req.body.pass;
    //comprobamos que sea los datos correctos
    if (user == "admin" && pass == "12345") {
        let passHash = await bcryptjs.hash(pass,8);
        res.json({
            message:"!Autenticacion Exitosa¡",
            passwordHash: passHash
        });
    } else {
        res.json({
            message:"!Ingrese los datos correctamente¡"
        });
    }
});

app.get("/compare", async (req,res)=>{
    let hastSaved = "$2a$08$NxJHZqSmO6KKoz/Ei6rkHOGwQgIp9GAPOLoh2e5.crNmYVBNxNFMS";
    let compare = await bcryptjs.compare("12345",hastSaved);

    if (compare) {
        res.json({
            message: "Las contraseñas coinciden"
        });
    } else {
        res.json({
            message:"Contraseña incorrecta"
        });
    }
});

app.get("/", (req,res)=>{
    res.send("Hello !!");
});
app.listen(port, (req,res)=>{
    console.log(`Server on port ${port}`);
});