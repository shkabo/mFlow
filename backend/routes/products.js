const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const confing = require('config');
const url = confing.DBHost;
const collection = "products";


const products = {

    /**
     * Get products list
     * @route /api/v1/products'
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
     * Get single product
     * @route /api/v1/product/:id
     */
    getOne: (req, res) => {
        let id = req.params.id;
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find(ObjectId(id), { password: 0 }).toArray((err, result) => {
                if (err) throw err;
                if (result && result.lengt > 0) {
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
     * Create new product
     * @route /api/v1/product/
     */
    create: (req, res) => {
        let productName = req.body.name.trim();
        let productPrice = (typeof req.body.price != 'undefined' ? req.body.price.trim() : 0);
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
     * Update product
     * @route /api/v1/product/:id
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
     * Delete product
     * @route /api/v1/product/:id
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