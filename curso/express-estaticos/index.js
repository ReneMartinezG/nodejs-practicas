/*jshint esversion: 6 */
const express =require("express");
const app = express();
const port = 3000;

app.set("view engine","ejs");

app.use(express.static("public"));
app.use("/recursos",express.static(__dirname+"/public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.listen(port, (req,res)=>{
    console.log(`Server on port ${port}`);
});
