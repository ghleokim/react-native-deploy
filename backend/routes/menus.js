const express = require('express');
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");

// select all menu
router.get('/', function(req, res, next) {
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

router.get('/:menuId', function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  models.menu.findOne({
      where: {
        truckId: TRUCK_ID,
        id: MENU_ID
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
router.post('/', function(req, res, next) {
  const TRUCK_ID = req.session.truckId

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

router.put('/:menuId', async function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  await models.menu.update({
      price: req.body.price,
      name: req.body.name,
      content: req.body.content
    }, {
      where: {
        truckId: TRUCK_ID,
        id: MENU_ID
      }
    });
  let resultMenu = await models.menu.findOne({
      where: {
        truckId: TRUCK_ID,
        id: MENU_ID
      }
    });

    console.log(resultMenu);
    res.json(resultMenu);
});

router.delete('/:menuId', function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  models.menu.destroy({
      where: {
        truckId: TRUCK_ID,
        id: MENU_ID
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
