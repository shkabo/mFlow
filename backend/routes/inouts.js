const mongoose = require('mongoose');
const inout = require('../models/inout');
const ObjectId = mongoose.Types.ObjectId;

const inouts = {

  getAll: (req, res) => {
    let query = inout.find({project_id: ObjectId(req.params.id)})
    .populate('user_add', 'full_name')
    .populate('product_id', 'name')
    .populate('user_take', 'full_name')
    .exec( (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });

  },

  create: {

  },

  update: {

  },

  delete: {

  }

};

module.exports = inouts;
