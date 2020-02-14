const express = require("express");
const models = require("../models");
const router = express.Router();
const {isLoggedIn, isLoggedInByUser, isLoggedInBySeller, isLoggedInByAdmin} = require('./middlewares');

router.get("/", function(req, res, next) {
  res.json({ health: "OK" });
});

// 그 트럭에 대한 모든 리뷰
router.get('/all/:truckId', async function(req, res, next){
    let result = await models.review.findAll({
        where: {
            truckId : req.params.truckId
        },
        include: {
          model: models.reply,
        }
    })
    console.log(result);
    res.json(result);
});

router.get('/count/:truckId', async function(req, res, next){
  let result = await models.review.count({
    where: {
      truckId: req.params.truckId
    }
  });
  res.json(result);
})

router.get('/myReviews', isLoggedIn, async function(req, res, next){
  let result = await models.review.findAll({
    where: {
      userEmail: req.session.email
    }
  });
  res.json(result);
});

// 글쓰기
router.post("/create", isLoggedIn, async function(req, res, next) {
  let result = await models.review.create({
    content: req.body.content,
    starRating: req.body.starRating,
    truckId: req.body.truckId,
    userEmail: req.session.email
  });

  let avg = await models.review.findAll({
    attributes: [
      [
        models.sequelize.fn("AVG", models.sequelize.col("starRating")),
        "starRating"
      ]
    ],
    where: {
      truckId: result.truckId
    }
  });

  let avg1 = JSON.stringify(avg);
  let avg2 = JSON.parse(avg1);             
  let avg3 =  avg2[0].starRating;

  
  let resultTruck = await models.truck.update({
    starRatingAVG : avg3
  }, {
    where: {
      id: req.body.truckId
    }
  })
  
  console.log(JSON.stringify(resultTruck));
  res.json(result);
});

// review 1개 조회
router.get("/search/:reviewId", async function(req, res, next) {
  let result = await models.review.findOne({
    where: {
      id: req.params.reviewId
    }
  });
  res.json(result);
});

router.put("/update", isLoggedIn, async function(req, res, next) {
  let result = await models.review.update(
    {
      content: req.body.content,
      starRating: req.body.starRating
    },
    {
      where: {
        id: req.body.reviewId,
        userEmail: req.session.email
      }
    }
  );

  if (result == 0) {
    res.status(403).send({
      code: 0,
      message: "본인이 작성한 글만 수정 가능합니다."
    });
  } else {

    let resultTrc = await models.review.findOne({
      where: {
        id: req.body.reviewId
      }
    })

    let tId = resultTrc.truckId


    let avg = await models.review.findAll({
      attributes: [
        [
          models.sequelize.fn("AVG", models.sequelize.col("starRating")),
          "starRating"
        ]
      ],
      where: {
        truckId: resultTrc.truckId
      }
    });
  
    let avg1 = JSON.stringify(avg);
    let avg2 = JSON.parse(avg1);             
    let avg3 =  avg2[0].starRating;
  
    
    let resultTruck = await models.truck.update({
      starRatingAVG : avg3
    }, {
      where: {
        id: resultTrc.truckId
      }
    })


    let resultReview = await models.review.findOne({
      where: {
        id: req.body.reviewId
      }
    });
    res.json(resultReview);
  }
});

// 그 밑에 달린 댓글들도 다 삭제
router.delete("/delete/:reviewId", isLoggedIn, async function(req, res, next) {
  let findReview = await models.review.findOne({
    where: {
      userEmail: req.session.email,
      id: req.params.reviewId
    }
  });

  if (findReview == null) {
    res.status(401).send({
      code: 0,
      message: "본인이 작성한 리뷰만 삭제가능합니다."
    });
  } else {
    let truckId = findReview.truckId
    
    let avg = await models.review.findAll({
      attributes: [
        [
          models.sequelize.fn("AVG", models.sequelize.col("starRating")),
          "starRating"
        ]
      ],
      where: {
        truckId: truckId
      }
    });
  
    let avg1 = JSON.stringify(avg);
    let avg2 = JSON.parse(avg1);             
    let avg3 =  avg2[0].starRating;
  
    
    let resultTruck = await models.truck.update({
      starRatingAVG : avg3
    }, {
      where: {
        id: truckId
      }
    })


    let resultReplies = await models.reply.destroy({
      where: {
        reviewId: req.params.reviewId
      }
    });

    let resultReview = await models.review.destroy({
      where: {
        id: req.params.reviewId
      }
    });
    res.json(resultReview);
  }
});

module.exports = router;
