const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");
const calcDistance = require("../lib/distance");
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');

const sequelize = require("sequelize");
const Op = sequelize.Op;
// select all truck
router.get("/", function(req, res, next) {
  // res.send('all trucks');
  models.truck
    .findAll()
    .then(trucks => {
      console.log(trucks);
      res.json(trucks);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/starRating/:truckId', async function(req, res, next){
  let result = await models.review.findAll({
    attributes: [
      [
        models.sequelize.fn("AVG", models.sequelize.col("starRating")),
        "starRating"
      ]
    ],
    where: {
      truckId: req.params.truckId
    }
  });
  let avg = JSON.stringify(result);
  let avg1 = JSON.parse(avg);             
  console.log("JSON : " + avg1[0].starRating);

  res.json(result);
});


router.get("/boundary", function(req, res, next) {
  const x1 = Number(req.query.startLatitude);
  const y1 = Number(req.query.startLongitude);
  const x2 = Number(req.query.endLatitude);
  const y2 = Number(req.query.endLongitude);

  // res.send('all trucks');
  models.truck
    .findAll({
      attributes: [
        "id",
        "title",
        "contents",
        "imgURL",
        "latitude",
        "longitude",
        "state",
        "starRatingAVG"
      ],
      where: {
        latitude: { [Op.between]: [x1, x2] },
        longitude: { [Op.between]: [y1, y2] }
      }
    })
    .then(trucks => {
      console.log(trucks);
      res.json(trucks);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get("/getTruck", async function(req, res, next) {
  let result = await models.truck.findOne({
    where: {
      email: req.session.email
    },
    include: {
      model: models.menu
    },
    attributes: [
      "email",
      "title",
      "contents",
      "imgURL",
      "latitude",
      "longitude",
      "state",
      "truckNotice",
      "starRatingAVG"
    ]
  });
  console.log(result);
  res.send(result);
});

router.get("/:truckId", async function(req, res, next) {
  let result = await models.truck.findOne({
    where: {
      id: req.params.truckId
    },
    include: {
      model: models.menu
    },
    attributes: [
      "email",
      "title",
      "contents",
      "imgURL",
      "latitude",
      "longitude",
      "state",
      "truckNotice",
      "starRatingAVG"
    ]
  });

  var isFollow = false;
  var userEmail = null;
  if (req.session.email) {
    userEmail = req.session.email;
  }

  let resultFollow = await models.userTrucks.findOne({
    where: {
      truckId: req.params.truckId,
      userEmail: userEmail
    }
  });

  if (resultFollow) {
    var isFollow = true;
  }

  res.send({ result, isFollow: isFollow });
});

router.get("/search/:searchKeyword", function(req, res, next) {
  const searchKeyword = req.params.searchKeyword.trim();
  const userLatitude = req.query.latitude;
  const userLongitude = req.query.longitude;
  models.truck
    .findAll({
      attributes: [
        "id",
        "title",
        "contents",
        "imgURL",
        "latitude",
        "longitude",
        "state",
        "truckNotice",
        "starRatingAVG"
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + searchKeyword + "%"
            }
          },
          {
            "$menus.name$": {
              [Op.like]: "%" + searchKeyword + "%"
            }
          }
        ]
      },
      include: {
        model: models.menu,
        attributes: []
      }
    })
    .then(result => {
      for (var i = 0; i < result.length; i++) {
        result[i].dataValues.distance = calcDistance(
          result[i].latitude,
          result[i].longitude,
          userLatitude,
          userLongitude
        );
      }
      const sortedResult = result.sort((a, b) => {
        return a.distance - b.distance;
      });
      for (var i = 0; i < sortedResult.length; i++) {
        var dist = Math.round(sortedResult[i].dataValues.distance);
        if (dist >= 1000) {
          var StrDist = "" + dist;
          var len = StrDist.length;
          var frontNum = StrDist.substring(0, len - 3);
          var backNum = StrDist.substring(len - 3, len - 2);
          if (backNum == "0") {
            sortedResult[i].dataValues.distance = frontNum + "km";
          } else {
            sortedResult[i].dataValues.distance =
              frontNum + "." + backNum + "km";
          }
        } else {
          sortedResult[i].dataValues.distance += "m";
        }
      }
      res.json(sortedResult);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

// insert truck
router.post("/", isLoggedInBySeller, async function(req, res, next) {
  let notice = req.body.truckNotice || "";
  let resultTruck = await models.truck.create({
    email: req.session.email,
    title: req.body.title,
    contents: req.body.contents,
    imgURL: req.body.imgURL,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    state: req.body.state,
    truckNotice: notice,
    starRatingAVG: req.body.starRatingAVG
  });
  let getTruck = await models.truck.findOne({
    where: {
      email: req.session.email
    }
  });

  let resultSeller = await models.seller.update(
    {
      truckId: getTruck.id
    },
    {
      where: {
        userEmail: req.session.email
      }
    }
  );

  res.json(resultTruck);
});

router.put("/update/notice/:truckId", isLoggedInBySeller, async function(req, res, next){
  let findTruck = await models.truck.findOne({
    where: {
      id: req.params.truckId,
      email: req.session.email
    }
  });
  if (findTruck == null) {
    res.status(401).send({
      code: 0,
      message: "본인의 트럭만 수정 가능합니다."
    });
  }
  else{
    let result = await models.truck.update({
      truckNotice: req.body.truckNotice
    }, {
      where:{
        id: req.params.truckId
      }
    })
    let resultTruck = await models.truck.findOne({
      where: {
        id: req.params.truckId
      }
    });
    res.json(resultTruck);
  }

})
router.put("/update/:truckId", isLoggedInBySeller, async function(req, res, next) {
  let findTruck = await models.truck.findOne({
    where: {
      id: req.params.truckId,
      email: req.session.email
    }
  });

  if (findTruck == null) {
    res.status(401).send({
      code: 0,
      message: "본인의 트럭만 수정 가능합니다."
    });
  } else {
    let notice = req.body.truckNotice || "";
    let result = await models.truck.update(
      {
        title: req.body.title,
        contents: req.body.contents,
        state: req.body.state,
        imgURL: req.body.imgURL,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        truckNotice: notice
      },
      {
        where: {
          email: req.session.email,
          id: req.params.truckId
        }
      }
    );

    let resultTruck = await models.truck.findOne({
      where: {
        id: req.params.truckId
      }
    });

    res.json(resultTruck);
  }
});

router.delete("/delete/:truckId", isLoggedInBySeller, async function(req, res, next) {
  let resultTruck = await models.truck.destroy({
    where: { email: req.session.email, id: req.params.truckId }
  });

  if (resultTruck == 0) {
    res.status(401).send({
      code: 0,
      message: "본인의 트럭만 삭제 가능합니다."
    });
  } else {
    let resultSeller = await models.seller.update(
      {
        truckId: null
      },
      {
        where: { userEmail: req.session.mail }
      }
    );
    res.json(resultSeller);
  }
});

router.put("/:truckId/state", isLoggedInBySeller, async function(req, res, next) {

  if (req.params.truckId != req.session.truckId) {
    let error = new Error("푸드트럭 수정 권한이 없습니다.");
    error.status = 403;
    next(error);
  }

  const STATE = String(req.body.state).toUpperCase();
  const LONGITUDE = req.body.longitude || 0;
  const LATITUDE = req.body.latitude || 0;
  if (STATE === undefined) {
    let error = new Error("Request body에 state가 없습니다.");
    error.status = 401;
    next(error);
  }

  const tmp = await models.truck.findOne({
    attributes: ["state"],
    where: {
      id: req.session.truckId
    }
  })
  const PREV_STATE = tmp.state.toLowerCase()


  if(STATE == 'prepare') {
    if (PREV_STATE !== 'closed') {
      let error = new Error(`영엽 상태 변경 불가능 (기존 상태: ${PREV_STATE} , 요청 상태: ${STATE})`);
      error.status = 400;
      next(error);
    }

    await models.truckSaleHistory.create({
      truckId: req.session.truckId,
      predictedBeginTime: req.body.predictedBeginTime,
      predictedEndTime: req.body.predictedEndTime,
    });
  }
    
  if (STATE == 'open') {
    console.log('STATE == open')
    switch(PREV_STATE) {
      case 'open':
        console.log('OPEN + OPEN')
        let error = new Error(`영엽 상태 변경 불가능 (기존 상태: ${PREV_STATE} , 요청 상태: ${STATE})`);
        error.status = 400;
        next(error);
      case 'prepare':
        let truck = await models.truckSaleHistory.findOne({
        attributes: ["id"],
          where: {
            truckId: req.session.truckId,
          },
          order: [ [ 'id', 'DESC' ]],
        });
        let HISTORY_ID = truck.id
        await models.truckSaleHistory.update({
          beginTime: new Date(),
          predictedEndTime: req.body.predictedEndTime,
        },
        {
          where: {
            id: HISTORY_ID
          }
        })
        break;
      case 'closed':
        await models.truckSaleHistory.create({
          truckId: req.session.truckId,
          beginTime: new Date(),
          predictedEndTime: req.body.predictedEndTime,
        });
        break;
      }
    }

      if (STATE == 'closed') {
        let truck;
        switch(PREV_STATE) {
          case 'prepare':
              truck = await models.truckSaleHistory.findOne({
              attributes: ["id"],
              where: {
                truckId: req.session.truckId,
                beginTime: { [Op.eq]: null },
                endTime: { [Op.eq]: null },
              },
              order: [ [ 'id', 'DESC' ]],
              });
  
            await models.truckSaleHistory.destroy({
              where: { id: truck.id}
            })
            break;
          case 'open':
            truck = await models.truckSaleHistory.findOne({
              attributes: ["id"],
              where: {
                truckId: req.session.truckId,
              },
              order: [ [ 'id', 'DESC' ]],
              });
              
              await models.truckSaleHistory.update({
                endTime: new Date(),
              },
              {
                where: {
                  id: truck.id
                }
              })
            break;
          case 'closed':
            let error = new Error(`영엽 상태 변경 불가능 (기존 상태: ${PREV_STATE} , 요청 상태: ${STATE})`);
            error.status = 400;
            next(error);
        }
      }
      
    await models.truck.update(
      {
        state: STATE,
        longitude: LONGITUDE,
        latitude: LATITUDE
      },
      {
        where: {
          id: req.params.truckId
        }
      }
    );
    
  const responseDto = await models.truck.findOne({
    where: {
      id: req.params.truckId
    },
    attributes: ["state", "longitude", "latitude"]
  });

  res.json(responseDto);
})

router.get("/:truckId/history", async function(req, res, next) {
  const TRUCK_ID = req.params.truckId
  const responseDto = await models.truckSaleHistory.findAll({
    where: {
      truckId: TRUCK_ID,
      endTime: { [Op.ne]: null }
    },
    order: [ [ 'id', 'DESC' ]],
  });

  res.json(responseDto);
});

module.exports = router;
