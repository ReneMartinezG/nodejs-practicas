/*jshint esversion: 8 */
const {getConnection, sql} = require("../database/connection.js");

module.exports.getProducts = async (req, res ) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Products");
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports.getProductById = async (req, res ) =>{
    const {id} = req.params;

    const pool = await getConnection();
    const result = await pool.request()
    .input("id",sql.Int, id)
    .query("SELECT * FROM products WHERE Id = @id");

    res.json(result.recordset[0]);
};

module.exports.createProduct = async (req, res ) =>{
    const {Name, Description} = req.body;
    let {Quantity} = req.body;

    if(!Name || !Description){
        return res.status(400).json({message: "Faltan parametros"});
    }
    if(!Quantity){
        Quantity = 0;
    }
    
    try {
        const pool = await getConnection();
        await pool.request()
        .input("name", sql.VarChar, Name)
        .input("description", sql.VarChar, Description)
        .input("quantity",sql.Int, Quantity)
        .query("INSERT INTO Products (name,description,quantity) VALUES (@name, @description, @quantity)");

    res.json({message: "new Product"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports.updateProduct = async(req, res ) =>{
    const {Name, Description, Quantity} = req.body;
    const {id} = req.params;

    if(!Name || !Description || !Quantity){
        return res.status(400).json({message: "Faltan parametros"});
    }

    const pool = await getConnection();
    await pool.request()
    .input("id",sql.Int, id)
    .input("name",sql.VarChar, Name)
    .input("description",sql.VarChar, Description)
    .input("quantity",sql.Int, Quantity)
    .query("UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id");

    res.json({message: "Product Updated"});
};

module.exports.deletePRoduct = async (req, res ) =>{
    const {id} = req.params;

    const pool = await getConnection();
    await pool.request()
    .input("id",sql.Int, id)
    .query("DELETE FROM Products WHERE Id = @id");

    res.json({message: "Product Deleted"});
};

module.exports.getTotalProducts = async (req, res ) =>{
   try {
    const pool = await getConnection();
    const result = await pool.request()
    .query("SELECT COUNT(*) FROM Products");

    res.json(result.recordset[0]);

   } catch (error) {
    res.status(500);
    res.send(error.message);
   }
};
