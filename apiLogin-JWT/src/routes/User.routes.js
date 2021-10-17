/*jshint esversion: 6 */
const express = require("express");
const router = express.Router();
const users = require("../controllers/User.controlers.js");
const verifyToken = require("../controllers/verifyToken.js");

router.post("/signup",users.signup);

router.post("/signin",users.signin);

router.get("/me",verifyToken,users.me);

//testing token
//el token protege la ruta unicamente agregando el verifyToken
//con token
router.get("/dashboard",verifyToken,users.dashboard);
//sin token
router.get("/test",users.test);

module.exports = router;