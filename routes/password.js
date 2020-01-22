const express = require('express');
const router = express.Router();
const crypto = require("crypto");


module.exports = function(pass, salt){
    // console.log("first");
    return crypto.createHash("sha512").update(pass + salt).digest("hex");
};

module.exports = function(pass){
    // console.log("second");
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    return crypto.createHash("sha512").update(pass + salt).digest("hex");
};

