const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
let PORT = process.env.PORT || 9095;


require('dotenv').config();

const app = express();
app.use(cors(
  {
    origin:["http://localhost:3000"],
    credentials:true,
  }
));
app.use(express.json());

const cabRoutes = require('./routes/cabRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const pathRoutes = require('./routes/pathRoutes');

app.use('/cabs', cabRoutes);
app.use('/bookings', bookingRoutes);
app.use('/path', pathRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;