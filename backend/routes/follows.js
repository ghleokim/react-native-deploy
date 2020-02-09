const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");

router.post("/follow", async function(req, res, next) {
  let result = await models.userTrucks.create({
    truckId: req.body.truckId,
    userEmail: req.session.email
  });
  res.json(result);
});

router.delete("/unFollow", async function(req, res, next) {
  let result = await models.userTrucks.destroy({
    where: {
      truckId: req.body.truckId,
      userEmail: req.session.email
    }
  });
  res.json(result);
});

router.get("/followList", async function(req, res, next){
    let result = await models.userTrucks.findAll({
        where: {
            userEmail: req.session.email
        },
        include: [
            {
                model: models.truck,
                attributes: ['title','contents','imgURL','latitude','longitude','state'],
                where : {}
            }
        ]
    });
    console.log(result);
    res.json(result);
});

module.exports = router;
