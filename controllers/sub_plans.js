const Plans = require('../models/sub_plans');

exports.getPlans = (req, res, next) => {
  Plans.find({})
    .then((plans) => {
      return res.send({
        message: 'Plans retrieved Successfully',
        plans: plans,
      });
    })
    .catch(next);
};

//get a plan using id
exports.getPlan = (req, res, next) => {

  Plans.findOne({ _id: req.params.plan_id })
    .then((plan) => {
      return res.send({ message: 'Plan Retrieved Successfully', plan: plan });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Could not find Plan', error: err.stack });
    });
};

exports.newPlan = (req, res, next) => {
  const name = req.body.name,
    cost = parseFloat(req.body.cost),
    discount = parseFloat(req.body.discount);

  const plan = {
    name,
    cost,
    discount,
  };

  if (!plan.name || !plan.cost || !plan.discount) {
    res.status(400).send('Provide Data for all Fields');
    return;
  } else {
    Plans.create(plan)
      .then((plan) => {
        res.send({ message: 'New Plan Successfully Created', plan: plan });
      })
      .catch(next);
  }
};

exports.updatePlan = (req, res, next) => {
  const plan_id = req.params.plan_id;
  const plan = req.body;
  Plans.findByIdAndUpdate({ _id: plan_id }, plan)
    .then(() => {
      Plans.findOne({ _id: plan_id }).then((updatedPlan) => {
        res.send({
          message: 'Plan Updated Successfully',
          updated: updatedPlan,
        });
      });
    })
    .catch(next);
};

exports.deletePlan = (req, res, next) => {
  const plan_id = req.params.pla_id;
  Plans.findByIdAndDelete({ _id: plan_id })
    .then((deletedPlan) => {
      res.send({
        message: 'Plan Deleted Successfully',
        deleted: deletedPlan,
      });
    })
    .catch(next);
};
