const moongose = require('mongoose');
const Schema = moongose.Schema;

const sub_planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = moongose.model('Plans', sub_planSchema);
