/*jshint esversion: 8 */
const sql =  require("mssql");

const dbSettings = {
    user: process.env.USER,
    password :process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
};

module.exports.getConnection = async () =>{
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        throw error;
    }
};

module.exports.sql = sql;

