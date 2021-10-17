/*jshint esversion: 8 */
const express = require("express");
const app = express();

app.set("PORT",process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/products",require("./routes/products.routes.js"));

module.exports = app;