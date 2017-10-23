const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const products = require('./products.js');
const user = require('./users.js');

/**
 * Free to access routes
 */

router.post('/login', auth.login);

// only authenticated users can access
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

// only authenticated and autorized users can access
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;