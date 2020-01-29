const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");
const calcDistance = require("../lib/distance")

const sequelize = require("sequelize");
const Op = sequelize.Op;

// select all truck
router.get('/', function(req, res, next) {
  // res.send('all trucks');
  models.truck.findAll()
    .then((trucks) => {
      console.log(trucks);
      res.json(trucks);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })
});

router.get('/search/:searchKeyword', function(req, res, next) {
  console.log("query", req.query)

  const searchKeyword = req.params.searchKeyword
  const userLatitude = req.query.latitude;
  const userLongitude = req.query.longitude;
  //const userLatitude = 40;
  //const userLongitude = 100;
  models.truck.findAll({
      attributes: ['id', 'title', 'contents', 'imgURL', 'latitude', 'longitude','state'],
      where: {
        [Op.or]: [{
            title: {
              [Op.like]: "%" + searchKeyword + "%"
            },
          },
          {
            '$menus.name$': {
              [Op.like]: "%" + searchKeyword + "%"
            }
          }
        ]
      },
      include: {
        model: models.menu,
        attributes: [],
      }
    })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        result[i].dataValues.distance = calcDistance(result[i].latitude, result[i].longitude, userLatitude, userLongitude);
      }
      const sortedResult = result.sort((a, b) => {
        return a.distance - b.distance;
      });
      for (var i = 0; i < sortedResult.length; i++) {
        var dist = Math.round(sortedResult[i].dataValues.distance);
        if (dist >= 1000) {
          var StrDist = ""+dist;
          var len = StrDist.length;
          var frontNum = StrDist.substring(0, len - 3);
          var backNum = StrDist.substring(len - 3, len - 2);
          if (backNum == "0") {
            sortedResult[i].dataValues.distance = frontNum + "km";
          } else {
            sortedResult[i].dataValues.distance = frontNum + "." + backNum + "km";
          }
        } else {
          sortedResult[i].dataValues.distance += "m";
        }
      }
      res.json(sortedResult);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })
});

router.get('/:writer', function(req, res, next) {
  const TRUCK_ID = req.params.writer

  models.truck.findOne({
      where: {
        id: TRUCK_ID
      },
      include: {
        model: models.menu
      }
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// insert truck
router.post('/', function(req, res, next) {
  console.log(req.body.writer);

  models.truck.create({
      writer: req.body.writer,
      title: req.body.title,
      contents: req.body.contents,
      img: req.body.img,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      state: req.body.state
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.put('/:writer', function(req, res, next) {
  models.truck.update({
      title: req.body.title,
      contents: req.body.contents,
      state:req.body.state
    }, {
      where: {
        writer: req.params.writer
      }
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.delete('/:writer', function(req, res, next) {
  models.truck.destroy({
      where: {
        writer: req.params.writer
      }
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
})

module.exports = router;
