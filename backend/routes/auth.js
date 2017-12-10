const jwt = require('jwt-simple');
//const mongoose = require('mongoose');
const User = require('../models/user');

const auth = {

    /**
     * @api {post} /login Login
     * @apiName auth.Login
     * @apiGroup Auth
     *
     * @apiParam {String} email Users email
     * @apiParam {String} password  Users password
     *
     * @apiParamExample {json} Request-Example:
     *
     *     {
            	"email": "example1@test.com",
            	"password": "test123"
            }
     *
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    {
     *        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM1Mjg4NDA4NzN9.gTSVjrSucxJRuc0ofDvMS91x2r663Wts-fkkc-C7hB8",
     *        "expires": 1513528840873,
     *        "user": {
     *            "_id": "5a2d63858c6781413991d526",
     *            "email": "example1@test.com",
     *            "full_name": "John Doe"
     *        }
     *    }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 401
     *    {
     *        "status": 401,
     *        "message": "Invalid credentialss"
     *    }
     *
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
