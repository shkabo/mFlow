const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const confing = require('config');
const url = confing.DBHost;
const collection = "users";

//@TODO: Swap to mongoose instead of mongodb client ...

const users = {

  /**
   * @api {get} /api/v1/users getAll
   * @apiName users.getAll
   * @apiGroup User
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200
   *    [
            {
                "_id": "5a2d63778c6781413991d525",
                "email": "example1@test.com",
                "full_name": "Example One"
            },
            {
                "_id": "5a2d63858c6781413991d526",
                "email": "example2@test.com",
                "full_name": "Example Two"
            }
        ]

   *
   */
    getAll: (req, res) => {
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find({}, { password: 0 }).toArray((err, result) => {
                if (err) throw err;

                db.close();
                res.status(200).json(result);
            });
        });

    },

    /**
     * @api {get} /api/v1/user/:id getOne
     * @apiName users.getOne
     * @apiGroup User
     *
     * @apiParam {String} id Users ID hash
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    [
            {
                "_id": "5a2d63858c6781413991d526",
                "email": "example1@test.com",
                "full_name": "Example One"
            }
        ]
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "User not found"
     *    }
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
                        "message": "User not found"
                    });
                }
            });
        });
    },

    /**
     * @api {post} /api/v1/user/ create
     * @apiName users.create
     * @apiGroup User
     *
     * @apiParam {String} email Users email
     * @apiParam {String} full_name Users Full name
     * @apiParam {String} password Users password
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
              "full_name": "Bosko Stupar",
              "email": "example@test.com",
              "password": "test123"
            }
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
                "status": 200,
                "message": "Successfuly added new user",
                "userid": "5a2d63858c6781413991d526"
            }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "There was an error creating user"
     *    }
     *
     */
    create: (req, res) => {
        let newuser = req.body;
        //@TODO: Sanitize a bit better this input
        //@TODO: fix if not all fields are specified
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).insertOne({
                email: newuser.email.trim(),
                full_name: newuser.full_name.trim(),
                password: newuser.password.trim()
            }, (err, ins) => {
                if (err) throw err;
                if (ins.insertedCount > 0) {
                    db.close();
                    res.status(200).json({
                        "status": 200,
                        "message": "Successfuly added new user",
                        "userid": ins.insertedId
                    });
                } else {
                    db.close();
                    res.status(400).json({
                        "status": 400,
                        "message": "There was an error creating user"
                    });
                }
            });
        });
    },

    /**
     * @api {put} /api/v1/user/:id update
     * @apiName users.update
     * @apiGroup User
     *
     * @apiParam {String} id Users id hash
     * @apiParam {String} password Users password to be changed
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
            	"password": "test1233"
            }
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
            "status": 200,
            "message": "Success",
            "data": {
                "_id": "5a2d63858c6781413991d526",
                "email": "example@test.com",
                "full_name": "Bosko Stupar",
                "password": "test1233"
            }
        }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "There was an error creating user"
     *    }
     *
     */
    update: (req, res) => {
        let updateuser = req.body;
        let id = req.params.id;
        //@TODO: Some more verification and validation for password change !
        if (req.body.password.trim() && req.body.password.trim().length > 0) {

            mongoClient.connect(url, (err, db) => {
                db.collection(collection).findAndModify({ _id: ObjectId(id) }, [], { $set: { password: req.body.password } }, { new: false },
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
                                "message": "Specified user couldn't be found"
                            });
                        }

                    });
            });
        } else {
            db.close();
            res.status(400).json({
                "status": 400,
                "message": "New password was not provided"
            });
        }
    },

    /**
     * @api {delete} /api/v1/user/:id delete
     * @apiName users.delete
     * @apiGroup User
     *
     * @apiParam {String} id Users id hash
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
            "status": 200,
            "message": "User successfully deleted"
        }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 400
     *    {
     *        "status": 400,
     *        "message": "We couldn't find that user"
     *    }
     *
     */
    delete: (req, res) => {
        let id = req.params.id;
        //@TODO: Add validation who can delete user
        mongoClient.connect(url, (err, db) => {
            db.collection(collection).deleteOne({ _id: ObjectId(id) }, (err, doc) => {
                if (err) throw err;
                if (doc.deletedCount > 0) {
                    db.close();
                    res.status(200).json({
                        "status": 200,
                        "message": "User successfully deleted"
                    });
                } else {
                    db.close();
                    res.status(400).json({
                        "status": 400,
                        "message": "We couldn't find that user"
                    });
                }
            });
        });

    }
};

module.exports = users;
