/*jshint esversion: 9 */ 
const express = require ("express");
const router = express.Router();
const movies = require("../example.json");

router.get("/",(req,res)=>{
    res.json(movies);
});


router.post("/",(req,res)=>{
    const {title,year} = req.body;
    if (title && year) {
        const id = movies.length +1;
        const newMovie = {...req.body,id};
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.json("eror");
    }
});

router.delete("/:id",(req,res)=>{
    
});

module.exports = router;