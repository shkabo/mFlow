const mongoose = require('mongoose');
const Product = require('../models/product');
const ObjectId = mongoose.Types.ObjectId;


const projects = {

  getAll: (req, res) => {
    let query = Product.find({});
    query.exec( (err, projects) => {
      if (err) throw err;
      res.status(200).json(projects);
    });
  },
  getOne: (req, res) => {
    let id = req.params.id;
    let query = Product.find({_id: ObjectId(id)}).populate('user');
    query.exec((err, project) => {
      if (err) throw err;
      res.status(200).json(product);
    });
  },
  create: (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, product) => {
      if (err) throw err;
      res.status(200).json(product);
    });
  },
  update: (req, res) => {
    let id = req.params.id;
    Project.findById({_id: id}, (err, product) => {
      if (err) throw err;
      Object.assign(product, req.body).save( (err, product) => {
        if (err) throw err;
        res.status(200).json(product);
      });
    });
  },
  delete: (req, res) => {
    Product.delete({_id: req.params.id}, (err,result) => {
      res.send(200).json({
        "message": "Product successfully deleted",
        result
      });
    });
  }
};

module.exports = projects;
