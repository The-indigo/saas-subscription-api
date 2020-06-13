const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("../.env");
const jwt = require("jsonwebtoken");
const easyxml = require("easyxml");

exports.signUp = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    res.status(400).send({
      status: "Failed",
      message: "All fields are required",
    });
    return;
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(423)
        .send({ status: "Failed", message: "This email already registered" });
    }
  });
  bcrypt
    .hash(password, 12)
    .then((password) => {
      let user = new User({
        name: name,
        email: email,
        password: password,
      });
      return user.save();
    })
    .then(() =>
      res
        .status(200)
        .send({ status: "Success", message: "User registered successfully" })
    )
    .catch((err) => console.log(err));
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          status: "failed",
          message: "User not found,please provide correct credentials",
        });
      }

      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res.status(403).send({
            status: "failed",
            message:
              "Incorrect username or password, please provide correct details",
          });
        }
        const token = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.secret,
          { expiresIn: "5hr" }
        );
        res.status(200).send({
          status: "success",
          message: "login successfull",
          id: user._id,
          email: user.email,
          token,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.changePassword = (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newpassword;
  const id = req.params.id;
  if (!email || !newPassword || !id) {
    return res.status(403).send({
      message: "Data to update can not be empty!",
    });
  }

  bcrypt
    .hash(newPassword, 12)
    .then((password) => {
      User.findByIdAndUpdate(
        id,
        { password: password },
        { useFindAndModify: false }
      ).then((result) => {
        if (!result) {
          res.status(404).send({
            message: err,
          });
        } else res.send({ message: "updated successfully." });
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// exports.settings=(req,res)=>{
//         res.sendData = function(obj) {
//           if (request.headers['accept'] === 'json'|| request.headers['accept'] === 'text/html') {
//             res.header('Content-Type', 'application/json');
//             res.send(obj);
//           } else if (request.headers['accept'] === 'application/xml') {
//             res.header('Content-Type', 'text/xml');
//             var xml = easyxml.render(obj);
//             res.send(xml);
//           } else {
//             res.send(406);
//           }
//         };

//next();

//}
