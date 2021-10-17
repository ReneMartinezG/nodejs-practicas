/*jshint esversion: 8 */
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.encryptPassword = async (password)=>{
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password,salt);
};

userSchema.methods.validatePassword = function (password){
      return  bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("User",userSchema);