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
  let haveEmail = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });
  if (haveEmail == null) {
    let inputPassword = body.userPassword;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = await models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt,
      isSeller: 0 // false
    });

    let resultAuth = await models.authorities.create({
      authority: "ROLE_USER",
      userEmail: body.userEmail,
    });
    console.log(resultAuth);

    res.redirect("/users/sign_up");
  } else {
    res.status(401).send({
      code: 0,
      message: "이미 존재하는 이메일입니다."
    });
  }
});

router.get('/login', function(req, res, next) {
  let session = req.session;
  console.log(session);
  res.render("user/login", {
    session : session
  });
});

router.get('/getUser', async function(req, res, next) {
  let result = await models.user.findOne({
    where: {
      email: req.session.email
    },
    attributes: ['name', 'email', 'isSeller']
  });
  console.log(result);
  res.send({result, authority: req.session.authority, 
    businessRegistrationNumber: req.session.businessRegistrationNumber});
});

// 로그인 POST
router.post("/login", async function(req, res, next) {
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });
  let resultSeller = await models.seller.findOne({
    where: {
      userEmail: body.userEmail
    }
  });
  let resultAuth = await models.authorities.findOne({
    where:{
      userEmail: body.userEmail
    }
  })

  let resultTruck = await models.truck.findOne({
    where: {
      email: body.userEmail
    }
  })
  console.log("truckId : " + resultTruck.id)


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
    console.log(dbPassword);
    console.log(inputPassword);
    console.log(hashPassword);
    if (dbPassword === hashPassword) {

      // 세션 설정
      req.session.save(function() {
        req.session.email = body.userEmail;
        req.session.name = result.name;
        req.session.isSeller = result.isSeller;
        req.session.authority = resultAuth.authority;
        if (result.isSeller) {
          console.log(JSON.stringify(resultSeller))
          req.session.businessRegistrationNumber = resultSeller.businessRegistrationNumber;
          req.session.truckId = resultTruck.id;
          req.session.sellerId = resultSeller.id;
        }
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

  // res.redirect("/users/login")
  res.send(true);
})

router.put('/update', async function(req, res, next) {
  let result = await models.user.findOne({
    where: {
      email: req.session.email
    }
  });

  models.user.update({
      name: req.body.userName
    }, {
      where: {
        email: req.session.email
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
router.delete("/delete", async function(req, res, next) {
  let result = await models.user.destroy({
    where: {
      email: req.session.email
    }
  });

  let resultAuth = await models.authorities.destroy({
    where : {userEmail: req.session.email}
  })

  res.json(result);
});

module.exports = router;
