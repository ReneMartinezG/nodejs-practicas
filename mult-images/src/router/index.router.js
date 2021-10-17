/*jshint esversion: 6 */ 
const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index.ejs");
});
router.post("/upload",(req,res)=>{
    console.log(req.file);
    res.send("upload");
});

module.exports = router;