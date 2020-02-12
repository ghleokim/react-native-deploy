const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks, notice} 
        = require("../models");
const sequelize = require("sequelize");


router.get("/", async function(req, res, next) {
  let result = await notice.findAll();
  res.json(result);
});

router.post('/admin/add', async function(req, res, next){
    console.log("here")
    let resultAuth = await authorities.findOne({
        where: {
          userEmail: req.session.email
        }
      });
      if (resultAuth.authority != "ROLE_ADMIN") {
        res.status(404).send({
          code: 1001,
          message: "권한이 없습니다."
        });
      } else {
        let result = await notice.create({
            title: req.body.title,
            content: req.body.content,
            userEmail: req.session.email
        });
        res.json(result);
      }
})

router.put('/admin/update', async function(req, res, next){
    let resultAuth = await authorities.findOne({
        where: {
          userEmail: req.session.email
        }
      });
      if (resultAuth.authority != "ROLE_ADMIN") {
        res.status(404).send({
          code: 1001,
          message: "권한이 없습니다."
        });
      } else {
        let result = await notice.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.body.noticeId
            }
        });
        res.json(result);
      }
})

router.delete('/admin/delete/:noticeId', async function(req, res, next){
    console.log("del");
    let resultAuth = await authorities.findOne({
        where: {
          userEmail: req.session.email
        }
      });
      if (resultAuth.authority != "ROLE_ADMIN") {
        res.status(404).send({
          code: 1001,
          message: "권한이 없습니다."
        });
      } else {
        let result = await notice.destroy({
            where:{
                id: req.params.noticeId
            }
        });
        res.json(result);
      }
})


module.exports = router;