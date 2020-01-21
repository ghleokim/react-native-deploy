const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");


router.get('/sign_up', function (req, res, next) {
    res.render("sellers/sign_up");
});

router.post("/sign_up", async function (req, res, next) {
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = models.seller.create({
        name: body.sellerName,
        email: body.sellerEmail,
        password: hashPassword,
        businessRegistrationNumber: body.sellerBusinessRegistrationNumber,
        salt: salt
    })

    res.redirect("/sellers/sign_up");
});

router.get('/', function (req, res, next) {
    if (req.cookies) {
        console.log(req.cookies);
    }

    res.send("사장님 환영합니다 ~");
});

router.get('/login', function (req, res, next) {
    let session = req.session;
    console.log(session);
    res.render("sellers/login", {
        session: session
    });
});

router.post("/login", async function (req, res, next) {
    let body = req.body;

    let result = await models.seller.findOne({
        where: {
            email: body.sellerEmail
        }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if (dbPassword === hashPassword) {
        // 세션 설정
        req.session.email = body.sellerEmail;
        res.redirect("/sellers");
    }
    else {
        console.log("비밀번호 불일치");
        res.redirect("/sellers/login");
    }
});

// 로그아웃
router.get("/logout", function (req, res, next) {
    req.session.destroy();
    res.clearCookie('sid');

    res.redirect("/sellers/login")
})

module.exports = router;

