const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const easyxml = require('easyxml');
require("dotenv").config();


// easyxml.configure({
//     singularizeChildren: true,
//     underscoreAttributes: true,
//     rootElement: 'response',
//     dateFormat: 'ISO',
//     indent: 2,
//     manifest: true
//   });

//    app.use('/settings',(req, res, next)=> {
//        res.sendData = function(obj) {
//     if (request.headers['accept'] === 'json'|| request.headers['accept'] === 'text/html') {
//         res.header('Content-Type', 'application/json');
//         res.send(obj);
//       } else if (request.headers['accept'] === 'application/xml') {
//         res.header('Content-Type', 'text/xml');
//         var xml = easyxml.render(obj);
//         res.send(xml);
//       } else {
//         res.send(406);
//       }
//     };
  
//      next();
//   });

const userRoutes = require("./routes/user");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);

app.use((req, res) => {
  res.send("welcome");
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));


