const express = require('express');
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');

router.get('/all', async function(req, res, next){
    let result = await models.report.findAll({
      include: {
        model: models.truck,
      },
    });

    res.json(result);
});

router.post('/report', isLoggedIn, async function(req, res, next){
        let findModel = null;
        if (req.body.division == 1) {
          findModel = await models.truck.findOne({
            where: {
              id: req.body.targetId
            }
          });
          console.log(findModel);
        } else if (req.body.division == 2) {
          findModel = await models.review.findOne({
            where: {
              id: req.body.targetId
            }
          });
        } else {
          findModel = await models.reply.findOne({
            where: {
              id: req.body.targetId
            }
          });
        }
        let str = "";
        if (findModel != null) {
          str = JSON.stringify(findModel);
        }
        console.log(str);
        let result = await models.report.create({
          userEmail: req.session.email,
          category: req.body.category,
          content: req.body.content,
          division: req.body.division,
          targetId: req.body.targetId,
          truckId: req.body.targetId,
          original: str
        });

        res.json(result);
});

// truck, review, reply id 에 대한 전체 신고 횟수
router.get('/count/:division/:targetId', async function(req, res, next){
    let result = await models.report.count({
        where: {
            division: req.params.division,
            targetId: req.params.targetId
        }
    });
    res.json(result);
})

// 특정 신고 유형에 대한 신고 횟수
router.get('/count/:division/:category/:targetId', async function(req, res, next){
    let result = await models.report.count({
        where: {
            division: req.params.division,
            category: req.params.category,
            targetId: req.params.targetId
        }
    });
    res.json(result);
})

router.delete('/delete/:id', isLoggedIn, async function(req, res, next){
    let result = await models.report.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(result);
})

module.exports = router;
