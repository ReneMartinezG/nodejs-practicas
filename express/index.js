/*jshint esversion: 6 */
// Express es un framework de nodejs o de javascript 
// que nos permite crear aplicaciones web del lado del servidor

const express = require("express");
const { get } = require("http");
const port = 3000;
const server = express();
const morgan = require("morgan");

//settings
server.set("appName","Check Express");
//motor de plantillas ejs ayudan a extender el html
//npm install ejs
//no se tiene que requerir (require) ejs por que trabaja bien con nodejs
//simplemente se especifica que plantilla se usara
server.set("view engine","ejs"); // voy a establazer como motr de plantilla ejs
//despues se creo la carpeta views con el archivo index.ejs
//podemos ecribir html y llamarlo de la sig manera


//esto se puede usar para realizar consultas de ll abase de datos
server.get("/",(req,res) =>{
    res.render("index.ejs");
});


//(logger)Middlewares --> manejador de peticion que podemos usar antes de que lleguen a su ruta original
// los middlewares deben ir antes de las rutas
/*
const logger = (req, res, next) =>
{
 console.log(`Route received: ${req.protocol}://${req.get("host")}${req.originalUrl}`);
 next();
};

server.use(logger);
*/
//hay un modulo que hace lo de logger se llama morgan lo podemos busca en npm
//para instalarlo: npm install morgan
// esto hace lo mismo que logger y mas
server.use(morgan("dev"));

const serverGet = () =>
{
    console.log(server.get("appName"));
    console.log(`Server on port ${port}`);
};

const serverAbout = (req,res) =>
{
    res.send("About");
};
const serverTest = (req,res) =>
{
    res.send("<h1>Test</h1>");
};
const serverStart = (req,res) =>
{
    res.send("Start");
};
const serverExit = (req,res) =>
{
    res.send("Exit");
};

const serverRe = (req,res) =>
{
    res.send("hello world, GET REQUEST RECIEVED");
};

server.listen(port,serverGet);
//server.get("/",serverRe);


//Express routing
// es la ruta que se le da con server.get("/")
//ej
//para acceder a la ruta: localhost:300/about
server.get("/about",serverAbout);
// localhost:300/start
server.get("/start",serverStart);
//localhost:300/exit
server.get("/exit",serverExit);

//hasta ahora para ver los cambios en el servidor 
//tenemos que estar iniciando el servidor con el comando node index.js
//pero se puede hacer mas facil con el framework  nodemon
// instalarlo: npm install --save-dev nodemon --> es la forma local (no recomendada)
//lo instalamos asi para pode usarlo en este proyecto unicamente 
//ya que no lo subiremos a ningun servidor 
// Nodemon va a reiniciar nuestro servidor automaticamente cuando salvemos 
// nuestro codigo esto agiliza las cosas
// para ejecutar el servidor con nodemon
//npx nodemon index.js donde index.js es el archivo main

server.get("/test",serverTest);



// Metodos http
// veremos los 4 metodos mas usados que son:
// get, post, put delete
 
const serverPost = (req,res) =>
{
    res.send("POST REQUEST RECEIVED");
};
const serverPut = (req,res) =>
{
    res.send("<h1>UPDATE REQUEST RECEIVED</h1>");
};
const serverDelete = (req,res) =>
{
    res.send("DELETE REQUEST RECEIVED");
};

server.post("/post",serverPost);
server.put("/put",serverPut);
server.delete("/delete",serverDelete);

//para poder ver las peticiones http post put y delete usaremos postman
// UNICAMENTE UTILIZAMOS EL LINK PARA ENTRAR: LOCALHOST:3000/POST

//Middlewar de archivos estaticos, sirve para enviar archivos al frontend archivos html css etc
//este vieene dentro de express
//poniendo esto donde public es el nombre de la carpeta donde esta alojado el index.html
//para que funcione tiene no tiene que estar nada en la ruta inicial --> server.get("/",serverRe);
server.use(express.static('public'));
