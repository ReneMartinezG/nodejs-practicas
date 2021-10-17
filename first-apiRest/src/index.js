/*jshint esversion: 6 */ 
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;




app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(require("./routes/index.routes.js"));
app.use(("/api/movies"),require("./routes/movies.routes.js"));

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});