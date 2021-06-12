const express = require('express');
const router = express.Router();
var table = require('../models/members');
var cors = require('cors'); // We will use CORS to enable cross origin domain requests.

const strUrlPath = '/';

/* GET ALL BOOKS */
router.get(strUrlPath, cors(), function (req, res, next) {
  if (req.query.email === undefined) {
    console.log('I am get all ++++++++++++');
    table.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
    return;
  }
  if (req.query.email.length > 0) {
    console.log('I am here++++++');
    console.log(req.query.email);
    let qryStr = req.query.email;

    table.findOne({ email: qryStr }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }
});

/* GET SINGLE BY ID */
router.get(strUrlPath + '/:email', cors(), function (req, res, next) {
  console.log('I am here+++1111+++');
  console.log(req.query.email);

  var email = req.query.email;

  table.findById(email, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE  */
router.post(strUrlPath, cors(), function (req, res, next) {
  console.log(req.body);

  let data = {
    email: req.body.email,
    password: req.body.password,
    sportItem: req.body.sportItem,
    bEUcitizen: req.body.passport === 'true' ? true : false,
    bPrivacy: req.body.isPrivacy === 'on' ? true : false,
    bFilled: false,
  };
  console.log(data);
  table
    .create(data)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* UPDATE  */
router.put(strUrlPath + '/:id', cors(), function (req, res, next) {
  console.log('I am update ++++++++++++' + req.params.id);
  table.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE */
router.delete(strUrlPath + '/:id', cors(), function (req, res, next) {
  console.log('I am delete ++++++++++++');
  console.log(req.params.id);
  tblStations.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
