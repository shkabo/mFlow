const products = {

    getAll: function(req, res) {

        res.json(allProducts);
    },

    getOne: function(req, res) {
        let id = req.params.id;
        res.json(product);
    },

    create: function(req, res) {
        let newProduct = req.body;
        res.json(newProduct);
    },

    update: function(req, res) {
        let updateProduct = req.body;
        let id = req.params.id;
        res.json(updateProduct);
    },

    delete: function(req, res) {
        let id = req.params.id;
        res.json(true);
    }
};

module.exports = products;