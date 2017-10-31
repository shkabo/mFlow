const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017/mflow";
const collection = "users";


const users = {

    /**
     * Get all users
     * @route /api/v1/users
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
     * Get single user
     * @route /api/v1/user/:id
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
                        "message": "User not found"
                    });
                }
            });
        });
    },

    /**
     * Create new user
     * @route /api/v1/user/
     */
    create: (req, res) => {
        let newuser = req.body;
        //@TODO: Sanitize a bit better this input
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
     * Change password
     * @route /api/v1/user/:id
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
     * Delete user
     * @route /api/v1/user/:id
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