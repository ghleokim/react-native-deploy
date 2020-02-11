const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");

// select all menu
router.get("/", async function(req, res, next) {
  let result = await models.menu.findAll();

  res.json(result);
});

router.get("/:menuId", async function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  let result = await models.menu.findOne({
    where: {
      truckId: TRUCK_ID,
      id: MENU_ID
    }
  });

  res.json(result);
});

// insert menu
router.post("/", async function(req, res, next) {
  console.log("!!");
  const TRUCK_ID = req.session.truckId;
  let result = await models.menu.create({
    truckId: TRUCK_ID,
    price: req.body.price,
    name: req.body.name,
    content: req.body.content,
    imgURL: req.body.imgURL
  });

  res.json(result);
});

router.put("/:menuId", async function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  let result = await models.menu.update(
    {
      price: req.body.price,
      name: req.body.name,
      content: req.body.content,
      imgURL: req.body.imgURL
    },
    {
      where: {
        truckId: TRUCK_ID,
        id: MENU_ID
      }
    }
  );

  let resultMenu = await models.menu.findOne({
    where: {
      truckId: TRUCK_ID,
      id: MENU_ID
    }
  });

  console.log(resultMenu);
  res.json(resultMenu);
});

router.delete("/:menuId", async function(req, res, next) {
  const TRUCK_ID = req.session.truckId;
  const MENU_ID = req.params.menuId;

  let result = await models.menu.destroy({
    where: {
      truckId: TRUCK_ID,
      id: MENU_ID
    }
  });

  res.json(result);
});

module.exports = router;
