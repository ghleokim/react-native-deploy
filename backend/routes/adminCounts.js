const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks, openingHours} 
        = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const moment = require('moment');


// 오늘 가입 유저
router.get('/users/day', async function(req, res, next){
    let d = moment(); 		 				 

    let result = await user.findAndCountAll({
        where:{
            createdAt: {
                [Op.lte]: moment(d).format(),
                [Op.gte]: moment(d).startOf('day')
            }
        }
    })
    res.json(result);
});

router.get('/reviews/day', async function(req, res, next){
    let d = moment();
    let result = await review.findAndCountAll({
        where:{
            createdAt: {
                [Op.lte]: moment(d).format(),
                [Op.gte]: moment(d).startOf('day')
              }
        }
    })
    res.json(result);
});

router.get('/reviews/all', async function(req, res, next){
    let result = await review.findAll({
        include: {
            model: reply
        }
    });
    res.json(result);
});

// 오늘 가입 판매자
router.get('/sellers/day', async function(req, res, next){
    let d = moment();
    let result = await seller.findAndCountAll({
        where:{
            createdAt: {
                [Op.lte]: moment(d).format(),
                [Op.gte]: moment(d).startOf('day')
              }
        }
    })
    res.json(result);
});

// 전체 트럭
router.get('/trucks/total', async function(req, res, next){
    let result = await truck.findAndCountAll();
    res.json(result);
});

// 영업중 트럭
router.get('/trucks/open', async function(req, res, next){
    let result = await truck.findAndCountAll({
        where: {
            state: "OPEN"
        }
    });
    res.json(result);
});

// 준비중 트럭
router.get('/trucks/prepare', async function(req, res, next){
    let result = await truck.findAndCountAll({
        where: {
            state: "PREPARE"
        }
    });
    res.json(result);
});

router.get('/trucks/openingHours', async function(req, res, next){
    let result = await openingHours.findAndCountAll();
    res.json(result);
})

module.exports = router;