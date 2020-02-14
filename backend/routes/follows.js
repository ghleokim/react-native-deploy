const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');


router.post("/follow", isLoggedIn, async function(req, res, next) {
  let resultUser = await models.userTrucks.findOne({
    where: {
      truckId: req.body.truckId,
      userEmail: req.session.email
    }
  });

  if (!resultUser) {
    let result = await models.userTrucks.create({
      truckId: req.body.truckId,
      userEmail: req.session.email
    });
    res.send({ result, isFollow: true });
  } else {
    let result = await models.userTrucks.destroy({
      where: {
        truckId: req.body.truckId,
        userEmail: req.session.email
      }
    });
    res.send({ result, isFollow: false });
  }
});

router.get("/followList", async function(req, res, next) {
  let result = await models.userTrucks.findAll({
    where: {
      userEmail: req.session.email
    },
    include: [
      {
        model: models.truck,
        attributes: [
          "title",
          "contents",
          "imgURL",
          "latitude",
          "longitude",
          "state",
          "starRatingAVG"
        ],
        where: {}
      }
    ]
  });
  console.log(result);
  res.json(result);
});

module.exports = router;
