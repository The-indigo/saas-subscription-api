const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptions');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//jwt token verification middleware
verifyUser = (req, res, next) => {
  let token = req.headers['token'];
  if (!token) {
    return res.status(403).send({
      message: 'Token not available, Provide one',
    });
  }
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (decoded) {
      let email = decoded.email;
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return res.status(500).send({ message: 'User Not Found' });
          } else {
            return next();
          }
        })
        .catch((err) => {
          res.send({ stack: err.stack, message: err.message });
        });
    }
  });
};

//store a new subscription to db
router.post('/subscribe', verifyUser, subscriptionController.subscribe);

//get all subscriptions in the db
router.get(
  '/subscriptions/all',
  verifyUser,
  subscriptionController.getSubscriptions
);

//get a particular subscription
router.get(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.getSubscription
);

//update subscription route
router.put(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.updateSubscription
);

//delete subscription route
router.delete(
  '/subscription/:sub_id',
  verifyUser,
  subscriptionController.deleteSubscription
);

//get subscriber
router.get(
  '/subscription/subscriber/:sub_id',
  verifyUser,
  subscriptionController.subscriber
);

//get plan of the subscription
router.get(
  '/subscription/plan/:sub_id',
  verifyUser,
  subscriptionController.plan
);

module.exports = router;
