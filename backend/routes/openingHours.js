const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');


router.get('/getMyTime', async function(req, res, next){
    let result = await models.openingHours.findOne({
        where: {
            truckId: req.session.truckId
        }
    });
    res.json(result);
});

router.get('/getTime/:truckId', async function(req, res, next){
    let result = await models.openingHours.findOne({
        where:{
            truckId: req.params.truckId
        }
    });
    res.json(result);
});

router.post('/setTime', isLoggedInBySeller, async function(req, res, next){
    let result = await models.openingHours.create({
        truckId: req.session.truckId,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
    });
    res.json(result);
});

router.put('/updateTime', isLoggedInBySeller, async function(req, res, next){
    let result = await models.openingHours.update({
        beginTime: req.body.beginTime,
        endTime: req.body.endTime
    }, {
        where: {
            truckId: req.session.truckId
        }
    });

    let ret = await models.openingHours.findOne({
        where: {
            truckId: req.session.truckId
        }
    });

    res.json(ret);
});


module.exports = router;
