const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({"health": "OK"});
});

// 그 트럭에 대한 모든 리뷰
router.get('/all/:truckId', async function(req, res, next){
    let result = await models.review.findAll(
      {
        where: {
            truckId : req.params.truckId
        },
        include: {
          model: models.reply,
          limit: 1
        }
      }
    )
    console.log(result);
    res.json(result);
});

// 글쓰기
router.post('/create', async function(req, res, next){
    if(req.session == null){
        res.status(401).send({
            code: 0,
            message: "로그인 후 작성해주세요."
          });
    }

    let result = await models.review.create({
        content: req.body.content,
        startRating: req.body.startRating,
        truckId: req.body.truckId,
        userEmail: req.session.email,
    })
    console.log(result);
    res.json(result);
});

// review 1개 조회
router.get('/search/:reviewId', async function(req, res, next){
    let result = await models.review.findOne({
        where:{
            id: req.params.reviewId
        }
    })
    res.json(result);
});

router.put('/update', async function(req, res, next){
    let result = await models.review.update({
        content: req.body.content,
        startRating: req.body.startRating,
    }, {
        where :{
            id: req.body.reviewId,
            userEmail: req.session.email
        }
    });
    
    if (result == 0) {
      res.status(403).send({
        code: 0,
        message: "본인이 작성한 글만 수정 가능합니다."
      });
    } 
    else {
      let resultReview = await models.review.findOne({
        where: {
          id: req.body.reviewId
        }
      });
      res.json(resultReview);
    }

});

// 그 밑에 달린 댓글들도 다 삭제
router.delete('/delete/:reviewId', async function(req, res, next){
    let findReview = await models.review.findOne({
        where: {
            userEmail: req.session.email,
            id: req.params.reviewId
        }
    });

    if (findReview == null) {
      res.status(401).send({
        code: 0,
        message: "본인이 작성한 리뷰만 삭제가능합니다."
      });
    } 
    else {
      let resultReplies = await models.reply.destroy({
        where: {
          reviewId: req.params.reviewId
        }
      });

      let resultReview = await models.review.destroy({
        where: {
          id: req.params.reviewId
        }
      });
      res.json(resultReview);
    }
});




module.exports = router;
