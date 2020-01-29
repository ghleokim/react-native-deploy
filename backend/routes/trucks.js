const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");


// select all truck
router.get('/', function (req, res, next) {
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

router.get('/:writer', function (req, res, next) {
    const TRUCK_ID = req.params.writer

    models.truck.findOne({
        where: {id: TRUCK_ID},
        include: {
            model: models.menu, 
            where: {truckId: TRUCK_ID}
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
router.post('/', function (req, res, next) {
    console.log(req.body.writer);

    models.truck.create({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
        img: req.body.img,
        latitude: req.body.latitude,
        longitude: req.body.longitude
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

router.put('/:writer', function (req, res, next) {
    models.truck.update(
        { title: req.body.title, contents: req.body.contents },
        { where: { writer: req.params.writer } }
    )
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.delete('/:writer', function (req, res, next) {
    models.truck.destroy({ where: { writer: req.params.writer } }
    )
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