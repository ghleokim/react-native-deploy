const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

router.get('/sign_up', function (req, res, next) {
    res.render("sellers/sign_up");
});

// 회원가입!
router.post("/sign_up", async function (req, res, next) {
    let body = req.body;

    let inputPassword = body.sellerPassword;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = models.seller.create({
        name: body.sellerName,
        email: body.sellerEmail,
        password: hashPassword,
        businessRegistrationNumber: body.sellerBusinessRegistrationNumber,
        salt: salt
    })
    .then(result => {
        res.send('회원가입완료');
        // res.redirect("/sellers/sign_up");
    })
    .catch(err => {
        console.log(err)
    });
});
 
router.get('/', function (req, res, next) {
    if (req.cookies) {
        console.log(req.cookies);
    }

    res.send("사장님 환영합니다 ~");
});

// sellerEmail 기반 삭제
router.delete('/:sellerEmail', function (req, res, next) {
    models.seller.destroy({ where: { email: req.params.sellerEmail } })
      .then((result) => {
        console.log(result);
        res.json(result);
        // res.redirect('/');
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });

  // 이름 말고 뭘 바꿀까
  router.put('/', async function (req, res, next) {
    let result = await models.seller.findOne({
        where: {
            email: req.body.sellerEmail
        }
    });

    console.log(result.dataValues.salt);
    
    models.seller.update(
      { name: req.body.sellerName},
      { where: { email: req.body.sellerEmail } })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
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
    let inputPassword = body.sellerPassword;
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
});


module.exports = router;

