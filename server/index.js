const { setTimeout } = require('timers');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const socketIO = require('socket.io');
const io = socketIO();

const index = require('./routes/index');
const bookings = require('./routes/bookings');
const driverLocationSocket = require('./routes/driverLocation');
const driverLocation = require('./routes/driverLocation');
const drivers = require('./routes/drivers');

//views

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/api', bookings);
app.use('/api', driverLocationSocket);
app.use('/api', driverLocation);
app.use('/api', drivers);

io.listen(app.listen(PORT, () => console.log('Server running on PORT:', PORT)));

app.io = io.on('connection', function(socket) {
  console.log('Driver connected: ' + socket.id);
  // socket.on('disconnect', () => console.log('Driver disconnected'));
});
