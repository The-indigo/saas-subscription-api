const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const easyxml = require('easyxml');
require('dotenv').config();

//set up express app
const app = express();

app.use(express.json());

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

//map mongoose promise to the global promise as it has been deprecated
mongoose.Promise = global.Promise;

//use body-parser
app.use(bodyParser.json());

//initialize routes
app.use('/v1-node', require('./routes/subscriptions'));
app.use('/v1-node', require('./routes/sub_plans'));
app.use('/v1-node', require('./routes/user'));

app.use((req, res) => {
  res.send('welcome');
});

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});




//listen for request
app.listen(process.env.PORT, function () {
  console.log(`Listening for Request on PORT: ${process.env.PORT}`);
});