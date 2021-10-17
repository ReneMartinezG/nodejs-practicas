/*jshint esversion: 8 */
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");


module.exports.signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    //console.log(username,email,password);
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    //esta propiedad tiene que recibir una "llave secreta" lo ideal
    //seria pasarla en una vairable de entorno.
    const token = jwt.sign({id: user._id},"secretText",{
        expiresIn: 60*60*24
    });

    res.json({
        auth: true,
        token: token
    });
    
};

module.exports.signin = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send("Email dosen´t exixts");
    }

    const passwordIsValid = await user.validatePassword(password);
    if(!passwordIsValid){
        return res.status(401).json({
            autn: false,
            token: null
        });
    }

    //"secretText" tendria que estar en una varible de entorno
    const token = jwt.sign({id: user._id},"secretText",{
        expiresIn: 60*60*24
    });


    res.json({
        auth: true,
        token: token
    });
};

module.exports.me =async (req,res,next)=>{
    //---req.userId es una respuesta que viene del verifyToken
    console.log(req.userId);
    const user = await User.findById(req.userId,{password:0});
    if(!user){
        return res.status(404).send("No user found");
    }

    res.json(user);
};

//testing token

module.exports.dashboard = (req,res,next)=>{
    res.send("hello");
};

module.exports.test = (req,res,next)=>{
    res.send("hello");
};