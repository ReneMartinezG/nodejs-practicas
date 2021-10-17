/*jshint esversion: 6 */
const mongoose = require("mongoose");

const URL = "mongodb://localhost/api_login_jwt";

mongoose.connect(URL)
    .then( (db)=>{
        console.log("bd is connected");
    }).catch( (err)=>{
        console.log(err);
    });