const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

// 회원가입 GET
router.get('/sign_up', function(req, res, next) {
  res.render("users/sign_up");
});

// 회원가입 POST
router.post("/sign_up", async function(req, res, next) {
  let body = req.body;
  let haveEmail = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });
  if (haveEmail == null) {
    let inputPassword = body.userPassword;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt,
      isSeller: 0 // false

    })
    res.redirect("/user/sign_up");
  } else {
    res.status(401).send({
      code: 0,
      message: "이미 존재하는 이메일입니다."
    });
  }
});
// 메인 페이지
router.get('/', function(req, res, next) {
  if (req.cookies) {
    console.log(req.cookies);
  }
  if (req.session.isSeller) {
    res.send(req.session.name + " 판매자님 + 사용자");
  } else {
    res.send(req.session.name + " 사용자님");
  }
});

// 로그인 GET
router.get('/login', function(req, res, next) {
  let session = req.session;
  console.log(session);
  if (session.isSeller == 0) {
    res.send(session.name + " 사용자님");
  }
  // 아래 else문은 실행 안됨
  else {
    res.send(session.name + " 판매자님");
  }
  // res.render("user/login", {
  //   session : session
  // });
});

// 로그인 POST
router.post("/login", async function(req, res, next) {
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });
  if (result == null) {
    res.status(401).send({
      code: 0,
      message: "존재하지 않는 이메일입니다."
    });
  } else {
    let dbPassword = result.dataValues.password;
    let inputPassword = body.userPassword;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    
    if (dbPassword === hashPassword) {
      // 세션 설정
      req.session.save(function() {
        req.session.email = body.userEmail;
        req.session.name = result.name;
        req.session.isSeller = result.isSeller;
        res.json(req.session);
      })
    } else {
      res.status(401).send({
        code: 0,
        message: "비밀번호 불일치"
      });
    }
  }
});

// 로그아웃
router.get("/logout", function(req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/users/login")
})

router.put('/', async function(req, res, next) {
  let result = await models.user.findOne({
    where: {
      email: req.body.userEmail
    }
  });

  console.log(result.dataValues.salt);

  models.user.update({
      name: req.body.userName
    }, {
      where: {
        email: req.body.userEmail
      }
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// userEmail 기반 삭제
router.delete('/:userEmail', function(req, res, next) {
  models.user.destroy({
      where: {
        email: req.params.userEmail
      }
    })
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

module.exports = router;
