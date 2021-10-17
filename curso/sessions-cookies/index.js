/*jshint esversion: 6 */
const express= require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized:true
}));

app.get("/",(req,res)=>{
    req.session.usuario = "triton";
    req.session.rol = "Admin";
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

    res.send(`El usuario <strong> ${req.session.usuario} </strong> con rol <strong> ${req.session.rol} </strong> a visitado la pagina <strong> ${req.session.visitas} </strong> veces`);
});

app.get("/",(req,res)=>{
    res.send("hello my friend !!");
});

app.listen(port,(req,res)=>{
    console.log(`Server on port ${port}`);
});