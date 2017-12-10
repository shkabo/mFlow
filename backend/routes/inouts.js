const mongoose = require('mongoose');
const inout = require('../models/inout');
const ObjectId = mongoose.Types.ObjectId;

const inouts = {

  /**
     * @api {get} /api/v1/inouts/:id getAll
     * @apiName inouts.getAll
     * @apiGroup In Out
     *
     * @apiParam {String} id Project ID hash
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    [
              {
                  "_id": "5a2d8e391e5ff402c78d4943",
                  "product": {
                      "_id": "5a2d6f68acea6260dbec6bf5",
                      "name": "Example Product",
                      "price": 35
                  },
                  "quantity": 760,
                  "user_add": {
                      "_id": "5a2d63778c6781413991d525",
                      "full_name": "Example User"
                  },
                  "user_take": {
                      "_id": "5a2d63778c6781413991d525",
                      "full_name": "Example User"
                  },
                  "project_id": "5a2d8506a7b0be6faf78e69c",
                  "created": "2017-12-10T19:42:49.029Z"
              },
              {
                  "_id": "5a2d8f3e1e5ff402c78d4944",
                  "product": {
                      "_id": "5a2d71dcacea6260dbec6bf6",
                      "name": "Example2 Product",
                      "price": 44
                  },
                  "quantity": 22,
                  "user_add": {
                      "_id": "5a2d63778c6781413991d525",
                      "full_name": "Example User"
                  },
                  "user_take": {
                      "_id": "5a2d63778c6781413991d525",
                      "full_name": "Example User"
                  },
                  "project_id": "5a2d8506a7b0be6faf78e69c",
                  "created": "2017-12-10T19:47:10.279Z"
              }
          ]
     *
     */
  getAll: (req, res) => {
    inout.find({ project_id: ObjectId(req.params.id)})
      .populate([
        { path: 'user_add', select: 'full_name'},
        { path: 'user_take', select: 'full_name'},
        { path: "product", select:"name price"}
      ])
      .exec( (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });

  },

  /**
       * @api {post} /api/v1/inout/:id create
       * @apiName inouts.create
       * @apiGroup In Out
       *
       * @apiParam {String} id Project ID hash
       *
       * @apiParam {String} product Product ID hash
       * @apiParam {String} quatity Quantity/Amount of products added to project
       * @apiParam {String} user_add User ID hash who added this in/out
       * @apiParam {String} user_take User ID hash who took tese products for project
       *
       * @apiParamExample {json} Request-Example:
       *
       *     {
              	"product": "5a2d6f68acea6260dbec6bf5",
              	"quantity": 760,
              	"user_add": "5a2d63778c6781413991d525",
              	"user_take": "5a2d63778c6781413991d525"
              }
       *
       *
       * @apiSuccessExample Success-Response:
       *    HTTP/1.1 200
       *    {
                "product": {
                    "_id": "5a2d6f68acea6260dbec6bf5",
                    "name": "Example Product",
                    "price": 35
                },
                "quantity": 760,
                "user_add": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "user_take": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "project_id": "5a2d8506a7b0be6faf78e69c",
                "_id": "5a2d8e391e5ff402c78d4943",
                "created": "2017-12-10T19:42:49.029Z"
            }
       *
       *
       */
  create: (req, res) => {
    let id = req.params.id;

    let body = req.body;
    body.project_id = id;
    let io = new inout(body);


    io.save((err, ioData) => {
      if (err) throw err;
      ioData.populate([{ path: 'user_add', select: 'full_name'}, { path: 'product', select: 'name price'}, { path: 'user_take', select: 'full_name'}], (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });
    });

  },

  update: (req, res) => {

  },

  /**
       * @api {post} /api/v1/inouts/:id delete
       * @apiName inouts.delete
       * @apiGroup In Out
       *
       * @apiParam {String} id inout ID hash
       *
       * @apiSuccessExample Success-Response:
       *    HTTP/1.1 200
       *    {
               "status": 200,
               "message": "Addition successfully deleted",
            }
       *
       * @apiErrorExample Error-Response:
       *    HTTP/1.1 400
       *    {
       *        "status": 400,
       *        "message": "We couldn't remove this addition or was not found in the database."
       *    }
       *
       */
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
