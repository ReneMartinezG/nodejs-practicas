/*jshint esversion: 6 */ 
const express = require("express");
const router = express.Router();


router.get("/test",(req,res)=>{
    res.json({"saludo": "hola"});
});

module.exports = router;
