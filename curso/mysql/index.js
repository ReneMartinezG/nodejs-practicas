/*jshint esversion: 6 */
const mysql = require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    database:"crud_php_mysql",
    user: "root",
    password: ""
});

conn.connect( (err)=>{
    if (err){
        throw err;
    }else{
        console.log("connection sussefull !!");
    }
});

// //insert
// conn.query("INSERT INTO task (title,description) VALUES ('node js', 'task description in node js');", (err) =>{
//         if (err) {
//             throw err;
//         } else {
//             console.log("insert sussefull !!");
//         }
// });

// //delete
// conn.query("DELETE FROM task WHERE id=24;", (err) =>{
//     if (err) {
//         throw err;
//     } else {
//         console.log("delete is sussefull !!");
//     }
// });

// //update
// conn.query("UPDATE task SET title='node js title update', description='task description in node js updated' WHERE id=25", (err)=>{
//     if (err) {
//         throw err;
//     } else {
//         console.log("update is sussefull !!");
//     }
// });



//Read
conn.query("SELECT * FROM task;", (err,results,fields)=>{
    if (err) {
        throw err;
    }
    results.forEach(element => {
        console.log(element);
    });
});

conn.end();