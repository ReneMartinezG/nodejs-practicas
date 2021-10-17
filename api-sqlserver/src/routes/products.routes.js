/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products.controller.js");

router.get("/", productCtrl.getProducts);

router.get("/count",productCtrl.getTotalProducts);

router.get("/:id", productCtrl.getProductById);

router.post("/", productCtrl.createProduct);

router.put("/:id", productCtrl.updateProduct);

router.delete("/:id", productCtrl.deletePRoduct);



module.exports = router;