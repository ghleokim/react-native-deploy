const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({"health": "OK"});
});

// 그 트럭에 대한 모든 리뷰
router.get('/all/:truckId', async function(req, res, next){
    let result = await models.review.findAll({
        where: {
            truckId : req.params.truckId
        }
    })
    console.log(result);
    res.json(result);
});

// 글쓰기
router.post('/create', async function(req, res, next){
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
        }
    })
    console.log(result);
    res.json(result);
});

// 그 밑에 달린 댓글들도 다 삭제
router.delete('/delete/:reviewId', async function(req, res, next){
    let resultReplies = await models.reply.destroy({
        where: {
            reviewId: req.params.reviewId
        }
    });

    let resultReview = await models.review.destroy({
        where :{
            id: req.params.reviewId,
        }
    });
    res.json(resultReview);
    //res.redirect('/');
});




module.exports = router;
