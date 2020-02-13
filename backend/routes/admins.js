const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks} 
        = require("../models");
const sequelize = require("sequelize");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');


router.get("/", function(req, res, next) {
    res.json({ health: "OK" });
  });

router.delete("/delete/user/:email", isLoggedInByAdmin, async function(req, res, next) {
    let resultDel = await user.destroy({
      where: { email: req.params.email }
    });
    let resultAuth = await authorities.destroy({
      where: { userEmail: req.params.email }
    });
    res.send("삭제 완료");
});

router.delete("/delete/seller/:email", isLoggedInByAdmin, async function(req, res, next) {
    let resultSeller = await seller.destroy({
      where: { userEmail: req.params.email }
    });
    res.send("삭제 완료");
});

router.delete("/delete/truck/:truckId", isLoggedInByAdmin, async function(req, res, next) {
    let result = await truck.destroy({
      where: {
        id: req.params.truckId
      }
    });
    res.send("삭제 완료");
});

router.post('/approval', isLoggedInByAdmin, async function(req, res, next){
    let truckId = req.body.truckId;

    let resultTruck = await truck.findOne({
      where: {
          id: req.body.truckId
      }
    });

    let resultAuth = await authorities.update({
      authority : "ROLE_SELLER"
    }, {
      where: {
        userEmail: resultTruck.email
      }
    })

    res.send("승인 완료");
})

router.delete("/delete/review/:reviewId", isLoggedInByAdmin, async function(req, res, next) {
    let resultReview = await review.destroy({
      where: {
        id: req.params.reviewId
      }
    });
    res.send("삭제 완료");
});


router.delete("/delete/reply/:replyId", isLoggedInByAdmin, async function(req, res, next) {
    let resultReply = await reply.destroy({
      where: {
        id: req.params.replyId
      }
    });
    res.send("삭제 완료");
});

router.delete("/delete/menu/:menuId", isLoggedInByAdmin, async function(req, res, next) {
    let resultMenu = await menu.destroy({
      where: {
        id: req.params.menuId
      }
    });
    res.send("삭제 완료");
});

router.get('/auth/:email', isLoggedInByAdmin, async function(req, res, next){
  let result = await authorities.findOne({
    where: {
      email: req.params.email
    }
  });
  res.json(result);
})


module.exports = router;