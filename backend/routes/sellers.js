const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');


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

  res.send(200);
});

router.get("/", function(req, res, next) {
  if (req.cookies) {
    console.log(req.cookies);
  }

  res.send("사장님 환영합니다 ~");
});

// sellerEmail 기반 삭제
router.delete("/delete", isLoggedInBySeller, async function(req, res, next) {
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

router.put("/update", isLoggedInBySeller, async function(req, res, next) {
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

router.get("/myTrucks", isLoggedInBySeller, async function(req, res, next) {
  let result = await models.truck.findAll({
    where: { email: req.session.email }
  });
  console.log(result);
  res.json(result);
});

router.post("/approve", async function(req, res, next){
  let resultSeller = await models.seller.findOne({
    where: {
      businessRegistrationNumber: req.body.businessRegistrationNumber
    }
  });

  let resultAuth = await models.authorities.update({
    authority : "ROLE_WAITING_SELLER"
  }, {
    where: {
      userEmail: resultSeller.userEmail
    }
  })
  res.send("승인 요청");
})

module.exports = router;
