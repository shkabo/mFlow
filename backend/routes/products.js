const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const confing = require('config');
const url = confing.DBHost;
const collection = "products";

//@TODO: Swap to mongoose instead of mongodb client ...

const products = {

  /**
   * @api {get} /api/v1/products getAll
   * @apiName products.getAll
   * @apiGroup Products
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200
   *    [
            {
                "_id": "5a2d6f68acea6260dbec6bf5",
                "name": "product 1",
                "price": 35
            },
            {
                "_id": "5a2d71dcacea6260dbec6bf6",
                "name": "product 2",
                "price": 32
            }
        ]
   *
   */
    getAll: (req, res) => {
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find().toArray((err, result) => {
                if (err) throw err;

                db.close();
                res.status(200).json(result);
            });
        });
    },

    /**
     * @api {get} /api/v1/product/like findLike
     * @apiName products.findLike
     * @apiGroup Products
     *
     * @apiParam {String} name Part of the products name
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
                "name": "exa"
            }
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    [
            {
                "_id": "5a2d71dcacea6260dbec6bf6",
                "name": "example 1",
                "price": 32
            }
        ]
     *
     *
     */
    findLike: (req, res) => {
        let query = {
            name: {
                $regex: req.body.name,
                $options: 'i'
            }
        };
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find(query).toArray((err, result) => {
                if (err) throw err;

                db.close();
                res.status(200).json(result);
            });
        });
    },

    /**
     * @api {get} /api/v1/product/:id getOne
     * @apiName products.getOne
     * @apiGroup Products
     *
     * @apiParam {String} id Products ID hash
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    [
              {
                  "_id": "5a2d6f68acea6260dbec6bf5",
                  "name": "product 1",
                  "price": 35
              }
          ]
     *
     */
    getOne: (req, res) => {
        let id = req.params.id;
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find(ObjectId(id), { password: 0 }).toArray((err, result) => {
                if (err) throw err;
                if (result && result.length > 0) {
                    db.close();
                    res.status(200).json(result);
                } else {
                    db.close();
                    res.status(400).json({
                        "status": 400,
                        "message": "Specified product couldn't be found"
                    });
                }
            });
        });
    },

    /**
     * @api {post} /api/v1/product/ create
     * @apiName products.create
     * @apiGroup Products
     *
     * @apiParam {String} email Users email
     * @apiParam {String} full_name Users Full name
     * @apiParam {String} password Users password
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
            	"name": "UTP Cat6",
            	"price": 35
            }
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
                "status": 200,
                "message": "Successfuly added new product",
                "productId": "5a2d6f68acea6260dbec6bf5"
            }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "There was an error creating new product"
     *    }
     *
     */
    create: (req, res) => {
        let productName = req.body.name.trim();
        let productPrice = (typeof req.body.price != 'undefined' ? req.body.price : 0);
        console.log(req.body);
        //@TODO: add check if product exists !
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).insertOne({
                name: productName,
                price: productPrice
            }, (err, ins) => {
                if (err) throw err;
                if (ins.insertedCount > 0) {
                    db.close();
                    res.status(200).json({
                        "status": 200,
                        "message": "Successfuly added new product",
                        "productId": ins.insertedId
                    });
                } else {
                    db.close();
                    res.status(400).json({
                        "status": 400,
                        "message": "There was an error creating new product"
                    });
                }
            });
        });
    },

    /**
     * @api {put} /api/v1/product/:id update
     * @apiName products.update
     * @apiGroup Products
     *
     * @apiParam {String} id Products ID hash
     * @apiParam {String} full_name Users Full name
     * @apiParam {String} password Users password
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
            	"name": "example 11",
            	"price": 355
            }
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
                "status": 200,
                "message": "Success",
                "data": {
                    "_id": "5a2d71dcacea6260dbec6bf6",
                    "name": "example 11",
                    "price": 355
                }
            }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "Specified product couldn't be found"
     *    }
     *
     */
    update: (req, res) => {
        let id = req.params.id;

        let query = {
            name: req.body.name.trim(),
            price: (typeof req.body.price != 'undefined' ? req.body.price : 0)
        };

        mongoClient.connect(url, (err, db) => {
            db.collection(collection).findAndModify({ _id: ObjectId(id) }, [], { $set: query }, { new: true },
                (err, doc) => {
                    if (err) throw err;
                    if (doc.value != null) {
                        db.close();
                        res.status(200).json({
                            "status": 200,
                            "message": "Success",
                            "data": doc.value
                        });
                    } else {
                        res.status(400).json({
                            "status": 400,
                            "message": "Specified product couldn't be found"
                        });
                    }

                });
        });

    },

    /**
     * @api {delete} /api/v1/product/:id delete
     * @apiName products.delete
     * @apiGroup Products
     *
     * @apiParam {String} id Products ID hash
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
                "status": 200,
                "message": "Product successfully deleted"

            }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "Specified product couldn't be found"
     *    }
     *
     */
    delete: (req, res) => {
        let id = req.params.id;
        //@TODO: Add validation who can delete product
        mongoClient.connect(url, (err, db) => {
            db.collection(collection).deleteOne({ _id: ObjectId(id) }, (err, doc) => {
                if (err) throw err;
                if (doc.deletedCount > 0) {
                    db.close();
                    res.status(200).json({
                        "status": 200,
                        "message": "Product successfully deleted"
                    });
                } else {
                    db.close();
                    res.status(400).json({
                        "status": 400,
                        "message": "Specified product couldn't be found"
                    });
                }
            });
        });

    }
};

module.exports = products;
