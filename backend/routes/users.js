const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017/mflow";
const collection = "users";


const users = {

    /**
     * Get all users
     * @route /api/v1/admin/users
     * @param  {} req [description]
     * @param  {} res [description]
     * @return {json}    json list of users
     */
    getAll: function(req, res) {
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).find({}, {password: 0}).toArray((err, result) => {
                if (err) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "There was an error processing your request"
                    });
                    throw err;
                } else {
                    db.close();
                    res.status(200);
                    res.json(result);
                }
            });
        });

    },

    /**
     * Get single user
     * @route /api/v1/admin/user/:id
     * @param  {id} req user ID
     * @param  {} res
     * @return {json}     user data
     */
    getOne: function(req, res) {
        let id = req.params.id;
        mongoClient.connect(url, (err, db) => {
          if (err) throw err;
          db.collection(collection).find(ObjectId(id), {password: 0}).toArray((err, result) => {
            if (err) {
              es.status(400);
              res.json({
                  "status": 400,
                  "message": "There was an error processing your request"
              });
              throw err;
            } else {
              db.close();
              res.status(200);
              res.json(result);
            }
          });
        });
    },

    /**
     * Create new user
     * @param  {} req
     * @param  {} res
     * @return {json}     success/fail
     */
    create: function(req, res) {
        let newuser = req.body;

        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection(collection).insertOne({
                email : newuser.email,
                full_name: newuser.full_name,
                password: newuser.password
            }, (err, ins) => {
                if (err) throw err;
                if (ins.insertedCount > 0) {
                    res.status(200);
                    res.json({
                        "status": 200,
                        "message": "Successfuly added new user",
                        "user": ins.insertedId
                    });
                    db.close();
                    return;
                } else {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "There was an error creating user"
                    });
                }
            });
        });
    },

    update: function(req, res) {
        let updateuser = req.body;
        let id = req.params.id;
        mongoClient.connect(url, (err, db) => {
            db.collection(collection).findAndModify({
                
            });
        });

        res.json(updateuser);
    },

    delete: function(req, res) {
        let id = req.params.id;

        res.json(true);
    }
};

module.exports = users;
