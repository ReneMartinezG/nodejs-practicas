/*jshint esversion: 6 */
require("./database.js");
const app = require("./app.js");

app.listen(app.get("PORT"),()=>{
    console.log(`Server on port ${app.get("PORT")}`);
});