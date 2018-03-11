const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs(
  'mongodb://raghib:raghib@ds245478.mlab.com:45478/ridesharing',
  ['bookings']
);

//Get Single Driver
router.get('/driver/:id', function(req, res, next) {
  db.drivers.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    driver
  ) {
    if (err) {
      res.send(err);
    }
    res.send(driver);
  });
});

module.exports = router;
