const users = {

    getAll: function(req, res) {

        res.json(allusers);
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