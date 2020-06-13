const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    start_time: {
      type: Date,
    },
    end_time: {
      type: Date,
    },
    //reference the plan model via the plan_id
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plans',
    },
    //reference the user model via the user_id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscriptions', subscriptionSchema);
