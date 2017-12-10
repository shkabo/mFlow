const jwt = require('jwt-simple');
//const mongoose = require('mongoose');
const User = require('../models/user');

const auth = {

    /**
     * @api {post} /login Login User
     * @apiName auth.Login
     * @apiGroup Auth
     *
     * @apiParam {String} email Users email
     * @apiParam {String} password  Users password
     *
     * @apiSuccessExample Success-Response:
     *    HTTP
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    login: (req, res) => {
        let email = req.body.email || '';
        let password = req.body.password || '';

        if (email == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        auth.validate(email, password, res);
    },

    validate: (email, password, res) => {
        // do the validation in here !
        User.findOne({"email": email, "password": password}, '-password', (err, user) => {
          if (err) throw err;
          if (user && Object.keys(user).length > 0) {
            res.status(200).json(getToken(user));
          } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentialss"
            });
            return;
          }
        });
    }
};

getToken = (user) => {
    let expires = expiresIn(7);
    let token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
};

expiresIn = (numDays) => {
    let dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
};

module.exports = auth;
