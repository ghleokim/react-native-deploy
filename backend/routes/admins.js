const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks} 
        = require("../models");
const sequelize = require("sequelize");

router.get("/", function(req, res, next) {
    res.json({ health: "OK" });
  });

router.delete("/delete/user/:email", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let resultDel = await user.destroy({
      where: { email: req.params.email }
    });
    let resultAuth = await authorities.destroy({
      where: { userEmail: req.params.email }
    });
    res.send("삭제 완료");
  }
});

router.delete("/delete/seller/:email", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let resultSeller = await seller.destroy({
      where: { userEmail: req.params.email }
    });
    res.send("삭제 완료");
  }
});

router.delete("/delete/truck/:truckId", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let result = await truck.destroy({
      where: {
        id: req.params.truckId
      }
    });
    res.send("삭제 완료");
  }
});

router.post('/approval', async function(req, res, next){
    let truckId = req.body.truckId;
    res.send(truckId + " 트럭 승인해주세요");
})

router.delete("/delete/review/:reviewId", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let resultReview = await review.destroy({
      where: {
        id: req.params.reviewId
      }
    });
    res.send("삭제 완료");
  }
});


router.delete("/delete/reply/:replyId", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let resultReply = await reply.destroy({
      where: {
        id: req.params.replyId
      }
    });
    res.send("삭제 완료");
  }
});
  

router.delete("/delete/menu/:menuId", async function(req, res, next) {
  let resultAuth = await authorities.findOne({
    where: {
      userEmail: req.session.email
    }
  });
  if (resultAuth.authority == "ROLE_USER") {
    res.status(404).send({
      code: 1001,
      message: "권한이 없습니다."
    });
  } else {
    let resultMenu = await menu.destroy({
      where: {
        id: req.params.menuId
      }
    });
    res.send("삭제 완료");
  }
});


module.exports = router;