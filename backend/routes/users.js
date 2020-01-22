const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

// 회원가입 GET
router.get('/sign_up', function(req, res, next) {
  res.render("user/sign_up");
});

// 회원가입 POST
router.post("/sign_up", async function(req, res, next) {
  let body = req.body;

  let inputPassword = body.userPassword;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })

  res.redirect("/users/sign_up");
})


// 메인 페이지
router.get('/', function(req, res, next) {
  if (req.cookies) {
    console.log(req.cookies);
  }

  res.send("환영합니다 ~");
});

// 로그인 GET
router.get('/login', function(req, res, next) {
  if(req.session.email){
    console.log("/user " + JSON.stringify(req.session.email));
    return res.json(req.sesson.email);
  }else{
    res.render("user/login");
  }
  /*let session = req.session;
  console.log(session);
  res.render("user/login", {
    session : session
  });*/
});

// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.userPassword;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    // 세션 설정
    req.session.email = body.userEmail;
    res.redirect("/users");
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect("/users/login");
  }
});
// 로그아웃
router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/users/login")
})
module.exports = router;
