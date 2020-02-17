const express = require('express');
const router = express.Router();
const {authorities, menu, reply, report, review, seller, truck, truckusers, user, usertrucks, notice} 
        = require("../models");
const sequelize = require("sequelize");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');



router.get("/", async function(req, res, next) {
  let result = await notice.findAll({
    where: {
      state: 1
    }
  });
  res.json(result);
});

router.post('/admin/add', isLoggedInByAdmin, async function(req, res, next){  
        let result = await notice.create({
            title: req.body.title,
            content: req.body.content,
            userEmail: req.session.email,
            state: req.body.state
        });
        res.json(result);
})

router.put('/admin/update/state', isLoggedInByAdmin, async function(req, res, next){
    let resultNotice = await notice.findOne({
        where: {
            id: req.body.id
        }
    });
    let newState = !resultNotice.state;
    let updateNotice = await notice.update({
        state: newState
    }, {
        where: {
            id:req.body.id
        }
    });

    let body = await notice.findOne({
        where: {
            id: req.body.id
        }
    })
    res.json(body);
})

router.put('/admin/update', isLoggedInByAdmin, async function(req, res, next){
      let result = await notice.update({
          title: req.body.title,
          content: req.body.content
      }, {
          where: {
              id: req.body.noticeId
          }
      });

      let body = await notice.findOne({
          where: {
            id: req.body.noticeId
          }
      })
      res.json(body);
})

router.delete('/admin/delete/:noticeId', isLoggedInByAdmin, async function(req, res, next){
    let result = await notice.destroy({
        where:{
            id: req.params.noticeId
        }
    });
    res.json(result);
})


module.exports = router;