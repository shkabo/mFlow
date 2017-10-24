const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mflow";

const users = {

    getAll: function(req, res) {
        mongoClient.connect(url, (err, db) => {
            if (err) throw err;
            db.collection("users").find().toArray((err, result) => {
                if (err) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "There was an error processing your request"
                    });
                    throw err;
                } else {
                    res.status(200);
                    res.json(result);
                }
            });
        });

    },

    getOne: function(req, res) {
        let id = req.params.id;

        res.json(user);
    },

    create: function(req, res) {
        let newuser = req.body;

        res.json(newuser);
    },

    update: function(req, res) {
        let updateuser = req.body;
        let id = req.params.id;

        res.json(updateuser);
    },

    delete: function(req, res) {
        let id = req.params.id;

        res.json(true);
    }
};

module.exports = users;