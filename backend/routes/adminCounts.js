const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks} 
        = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

// 오늘 가입 유저
router.get('/users/day', async function(req, res, next){
    let result = await user.findAndCountAll({
        where:{
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
              }
        }
    })
    res.json(result);
});

// 오늘 달린 리뷰
router.get('/reviews/day', async function(req, res, next){
    let result = await review.findAndCountAll({
        where:{
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
              }
        }
    })
    res.json(result);
});

// 오늘 가입 판매자
router.get('/sellers/day', async function(req, res, next){
    let result = await seller.findAndCountAll({
        where:{
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
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

module.exports = router;