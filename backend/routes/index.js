const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const products = require('./products.js');
const user = require('./users.js');
const projects = require('./projects');
const inouts = require('./inouts')
/**
 * Free to access routes
 */

router.post('/login', auth.login);
router.get('/token', (req, res) => {
    res.json(getToken('bosko'));
});

// User routes
router.get('/api/v1/users', user.getAll);
router.get('/api/v1/user/:id', user.getOne);
router.post('/api/v1/user/', user.create);
router.put('/api/v1/user/:id', user.update);
router.delete('/api/v1/user/:id', user.delete);

// Product routes
router.get('/api/v1/products', products.getAll);
router.post('/api/v1/products', products.findLike);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
router.get('/api/v1/product/like', products.findLike);

// Project routes
router.get('/api/v1/projects', projects.getAll);
router.post('/api/v1/project/', projects.create);
router.get('/api/v1/project/:id', projects.getOne);
router.put('/api/v1/project/:id', projects.update);
router.delete('/api/v1/project/:id', projects.delete);

// In/Out products for projects
router.get('/api/v1/inouts/:id', inouts.getAll);
router.post('/api/v1/inout/', inouts.create);
router.put('/api/v1/inout/:id', inouts.update);
router.delete('/api/v1/inout/:id', inouts.delete);

// router.stack.forEach(function(r) {
//     if (r.route && r.route.path) {
//         console.log(r.route.path)
//     }
// });

module.exports = router;
