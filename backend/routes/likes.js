const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize");

router.post("/like", async function(req, res, next) {

  let resultUser = await models.truckUsers.findOne({
    where:{
      userEmail: req.session.email,
      truckId: req.body.truckId
    }
  });
  console.log("** : " + resultUser);

  if(!resultUser){
    let result = await models.truckUsers.create({
      userEmail: req.session.email,
      truckId: req.body.truckId
    });
    res.send({result, isLike : true});
  }
  else{
    let result = await models.truckUsers.destroy({
      where: {
        userEmail: req.session.email,
        truckId: req.body.truckId
      }
    });
    res.send({result, isLike : false});
  }
});

// router.delete("/unLike", async function(req, res, next) {
//   let result = await models.truckUsers.destroy({
//     where: {
//       userEmail: req.session.email,
//       truckId: req.body.truckId
//     }
//   });
//   res.json(result);
// });

router.get("/likeCount/:truckId", async function(req, res, next) {
  let result = await models.truckUsers.count({
    where: {
        truckId: req.params.truckId
    }
  });
  console.log(result);
  res.json(result);
});

module.exports = router;
