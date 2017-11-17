const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');
const product = require('./product');
const project = require('./project');

let inout = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number },
  user_add: { type: Schema.Types.ObjectId, ref: "user" },
  user_take: { type: Schema.Types.ObjectId, ref: "user" },
  project_id: { type: Schema.Types.ObjectId, ref: "project" },
  created: { type: Date, default: Date.now }
}, {
  versionKey: false
});

inout.pre('save', (next) => {
  now = new Date();
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('inout', inout);
