/*jshint esversion: 6 */ 
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const port = 3000;

//settings
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//statics files
app.use(express.static(path.join(__dirname,"public")));

//establece como se van a guardar las imagenes
const storageOriginalName = multer.diskStorage({
    destination: path.join(__dirname,"public/upload"),
    //manipular el nombre del archivo
    filename: (req,file,cb) =>{
        //podemos controlar el nombre se la imagen.
        //usadno file.originalname se sube al servidor con el nombre original
        //pero usaremos uuid (modulo) para generar un id unico
        //cb(null,file.originalname);
        //usando uuid
        cb(null,uuidv4()+path.extname(file.originalname).toLocaleLowerCase());
        //path.extname(file.originalname) --> meda la extencion del archivo solicitado
    }
});
//middlewares
app.use(multer({
    storage : storageOriginalName,
    dest: path.join(__dirname,"public/upload"),
    //se puede dar u limite en el peso que puede 
    //tener la imagen que vamos a subir (en kb)
    limits: {fileSize: 1000000},
    //filtrar para recibir imagenes unicamente
    fileFilter: (req,file,cb) =>{
        var fileTypes = /jpeg|jpg|png|gif/;
        var mimeType = fileTypes.test(file.mimetype);
        var extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
            if (mimeType && extName) {
             return cb(null, true);
            }
        cb("Error: solo se aceptan imagenes validas");
    }

}).single("image"));


//Routes
app.use(require("./router/index.router.js"));

app.listen(port,(req,res)=>{
    console.log(`Server on port ${port}`);
});