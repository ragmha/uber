const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs(
  'mongodb://raghib:raghib@ds245478.mlab.com:45478/ridesharing',
  ['bookings']
);

router.get('/bookings', function(req, res, next) {
  db.bookings.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});

router.post('/bookings', function(req, res, next) {
  const { data: booking, nearByDriver } = req.body;
  const io = req.app.io;

  if (!booking.username) {
    res.status(400).json({ error: 'Bad data' });
  } else {
    db.bookings.save(booking, function(err, savedBooking) {
      if (err) {
        res.send(err);
      }
      res.json(savedBooking);
      if (nearByDriver.socketId) {
        io.emit(nearByDriver.socketId + 'driverRequest', savedBooking);
      } else {
        console.log('Driver not connected');
      }
    });
  }
});

// Driver Update Booking done on driver side
router.put('/bookings/:id', function(req, res, next) {
  var io = req.app.io;
  var booking = req.body;
  console.log('BOOKING', booking);
  console.log('REQ PARAMS', req.params);
  if (!booking.status) {
    res.status(400).json({
      error: 'Bad Data'
    });
  } else {
    db.bookings.update(
      { _id: mongojs.ObjectId(req.params.id) },
      {
        $set: {
          driverId: booking.driverID,
          status: booking.status
        }
      },
      function(err, updatedBooking) {
        if (err) {
          res.send(err);
        }
        if (updatedBooking) {
          //Get Confirmed booking
          db.bookings.findOne(
            { _id: mongojs.ObjectId(req.params.id) },
            function(error, confirmedBooking) {
              if (error) {
                res.send(error);
              }
              console.log('ConfirmedBooking', confirmedBooking);
              res.send(confirmedBooking);

              io.emit('action', {
                type: 'BOOKING_CONFIRMED',
                payload: confirmedBooking
              });
            }
          );
        }
      }
    );
  }
});

module.exports = router;
