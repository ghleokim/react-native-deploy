const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

router.get("/sign_up", function(req, res, next) {
  res.render("sellers/sign_up");
});

// 회원가입!
router.post("/sign_up", async function(req, res, next) {
  let body = req.body;
  let inputPassword = body.sellerPassword;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  let resultUser = await models.user.create({
    name: body.sellerName,
    email: body.sellerEmail,
    password: hashPassword,
    salt: salt,
    isSeller: 1 // true
  });

  let resultAuth = await models.authorities.create({
    authority: "ROLE_USER",
    userEmail: body.sellerEmail
  });
  console.log(resultAuth);

  console.log("user 회원가입");

  let resultSeller = await models.seller.create({
    userEmail: body.sellerEmail, // fk (user의 pk)
    businessRegistrationNumber: body.sellerBusinessRegistrationNumber
  });
  console.log("seller 회원가입");

  res.redirect("/sellers/sign_up");
});

router.get("/", function(req, res, next) {
  if (req.cookies) {
    console.log(req.cookies);
  }

  res.send("사장님 환영합니다 ~");
});

// sellerEmail 기반 삭제
router.delete("/delete", async function(req, res, next) {
  let resultUser = await models.user.destroy({
    where: { email: req.session.email }
  });

  let resultSeller = await models.seller.destroy({
    where: { userEmail: req.session.email }
  });

  let resultAuth = await models.authorities.destroy({
    where: { userEmail: req.session.email }
  });

  console.log(resultUser);
  console.log(resultSeller);
  console.log(resultAuth);
  res.json(resultSeller);
});

router.put("/update", async function(req, res, next) {
  let findUser = await models.user.update(
    {
      name: req.body.name
    },
    {
      where: {
        email: req.session.email
      }
    }
  );

  let resultUser = await models.user.findOne({
    where: {
      email: req.session.email
    }
  });

  res.json(resultUser);
});

router.get("/login", function(req, res, next) {
  let session = req.session;
  console.log(session);
  if (session.isSeller == 1) {
    res.send(session.name + " 판매자님");
  } else {
    res.send(session.name + " 사용자님");
  }
  // res.render("sellers/login", {
  //     session: session
  // });
});

// 로그인은 여기 말고 /users/login 에서 하자
router.post("/login", async function(req, res, next) {
  let body = req.body;

  let result = await models.seller.findOne({
    where: {
      email: body.sellerEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.sellerPassword;
  let salt = result.dataValues.salt;
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
  if (dbPassword === hashPassword) {
    // 세션 설정
    req.session.email = body.sellerEmail;
    req.session.name = result.name;
    req.session.isSeller = 1;
    res.redirect("/sellers");
  } else {
    console.log("비밀번호 불일치");
    res.redirect("/sellers/login");
  }
});

router.get("/myTrucks", async function(req, res, next) {
  let result = await models.truck.findAll({
    where: { email: req.session.email }
  });
  console.log(result);
  res.json(result);
});

// 로그아웃
router.get("/logout", function(req, res, next) {
  req.session.destroy();
  res.clearCookie("sid");

  res.redirect("/sellers/login");
});

module.exports = router;
