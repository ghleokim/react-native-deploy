const express = require('express');
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");
// select all menu
router.get('/', function(req, res, next) {
  // res.send('all trucks');
  models.menu.findAll()
    .then((menus) => {
      console.log(menus);
      res.json(menus);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })
});
router.get('/:truckId/:name', function(req, res, next) {
  const TRUCK_ID = req.params.truckId;
  const foodName = req.params.name;

  models.menu.findOne({
      where: {
        truckId: TRUCK_ID,
        name: foodName
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

// insert menu
router.post('/:truckId', function(req, res, next) {
  const TRUCK_ID = req.params.truckId
  models.menu.create({
      truckId: TRUCK_ID,
      price: req.body.price,
      name: req.body.name,
      content: req.body.content,
      imgURL: req.body.imgURL
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

router.put('/:truckId/:name', function(req, res, next) {
  models.menu.update({
      price: req.body.price,
      name: req.body.name,
      content: req.body.content
    }, {
      where: {
        truckId: req.params.truckId,
        name: req.params.name
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

router.delete('/:truckId/:id', function(req, res, next) {
  models.menu.destroy({
      where: {
        truckId: req.params.truckId,
        id: req.params.id
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
