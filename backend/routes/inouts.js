const mongoose = require('mongoose');
const inout = require('../models/inout');
const ObjectId = mongoose.Types.ObjectId;

const inouts = {

  getAll: (req, res) => {
    inout.find({ project_id: ObjectId(req.params.id)})
      .populate([
        { path: 'user_add', select: 'full_name'},
        { path: 'user_take', select: 'full_name'},
        { path: "products.product", select:"name price"}
      ])
      .exec( (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });

  },

  create: (req, res) => {
    let id = req.params.id;

    let body = req.body;
    body.project_id = id;
    let io = new inout(body);


    io.save((err, ioData) => {
      if (err) throw err;
      ioData.populate([{ path: 'user_add', select: 'full_name'}, { path: 'products.product', select: 'name price'}, { path: 'user_take', select: 'full_name'}], (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });
    });

  },

  update: (req, res) => {

  },

  delete: (req, res) =>{
    inout.remove({ _id: req.params.id }, (err, result) => {
        if (err) throw err;
        if (result.result.n == 0) {
            res.status(400).json({
                "status": 400,
                "message": "We couldn't remove this addition or was not found in the database."
            });
        }
        if (result.result.n > 0) {
            console.log(result.result.n);
            res.status(200).json({
                "status": 200,
                "message": "Addition successfully deleted",
            });
        }
    });
  }

};

module.exports = inouts;
