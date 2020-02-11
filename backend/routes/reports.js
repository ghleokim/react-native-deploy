const express = require('express');
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");

router.get('/all', async function(req, res, next){
    let result = await models.report.findAll({
    });

    res.json(result);
});

router.post('/report', async function(req, res, next){
    if(req.session.email == null){
        res.status(401).send({
            code: 0,
            message: "로그인 후 작성해주세요."
          });
    }
    else{
        let findModel = null;
        if(req.body.division == 1){
            findModel = await models.truck.findOne({
                where:{
                    id: req.body.targetId
                }
            });
            console.log(findModel);
        }
        else if(req.body.division == 2){
            findModel = await models.review.findOne({
                where:{
                    id: req.body.targetId
                }
            })
        }
        else {
            findModel = await models.reply.findOne({
                where:{
                    id: req.body.targetId
                }
            })
        }
        let str = "";
        if(findModel != null){
            str = JSON.stringify(findModel)
        }
        console.log(str);
        let result = await models.report.create({
            userEmail: req.session.email,
            category: req.body.category,
            content: req.body.content,
            division: req.body.division,
            targetId: req.body.division,
            original: str
        });

        res.json(result);
    }
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

router.delete('/delete/:id', async function(req, res, next){
    let result = await models.report.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(result);
})

module.exports = router;
