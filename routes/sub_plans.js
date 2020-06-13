const router = require('express').Router();
const plansController = require('../controllers/sub_plans');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//verify user via email signed on the token
verifyUser = (req, res, next) => {
  let token = req.headers['token'];
  if (!token) {
    return res.status(403).send({
      message: 'You cannot access this route. Provide Token',
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

//routes for plan module
router.post('/plan', plansController.newPlan);
router.get('/plan/all', plansController.getPlans);
router.get('/plan/:plan_id', plansController.getPlan);
router.put('/plan/:plan_id', verifyUser, plansController.updatePlan);
router.delete('/plan/:pla_id', verifyUser, plansController.deletePlan);

module.exports = router;
