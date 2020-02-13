const express = require("express");
const models = require("../models");
const router = express.Router();
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');

router.get("/", function(req, res, next) {
  res.json({ health: "OK" });
});

// 특정 리뷰에 대한 댓글들
router.get("/searchReplies/:reviewId", async function(req, res, next) {
  let result = await models.reply.findAll({
    where: {
      reviewId: req.params.reviewId
    }
  });
  console.log(result);
  res.json(result);
});

router.post("/create", isLoggedIn, async function(req, res, next) {
    var sellerId = null;
    if (req.session.isSeller) {
      sellerId = req.session.sellerId;
    }
    console.log(sellerId);

    let resultSeller = await models.reply.create({
      content: req.body.content,
      reviewId: req.body.reviewId,
      userEmail: req.session.email,
      sellerId: sellerId
    });
    console.log(resultSeller);
    res.json(resultSeller);
});

router.get("/searchReply/:replyId", async function(req, res, next) {
  let result = await models.reply.findOne({
    where: {
      id: req.params.replyId
    }
  });
  res.json(result);
});

router.put("/update", isLoggedIn, async function(req, res, next) {
  let result = await models.reply.update(
    {
      content: req.body.content
    },
    {
      where: {
        id: req.body.replyId,
        userEmail: req.session.email
      }
    }
  );

  if (result == 0) {
    res.status(403).send({
      code: 0,
      message: "본인이 작성한 글만 수정 가능합니다."
    });
  } else {
    let resultReply = await models.reply.findOne({
      where: {
        id: req.body.replyId
      }
    });

    res.json(resultReply);
  }
});

router.delete("/delete/:replyId", isLoggedIn, async function(req, res, next) {
  let result = await models.reply.destroy({
    where: {
      id: req.params.replyId,
      userEmail: req.session.email
    }
  });

  if (result == null) {
    res.status(403).send({
      code: 0,
      message: "본인의 댓글만 삭제할 수 있습니다."
    });
  } else {
    res.json(result);
  }
});

module.exports = router;
