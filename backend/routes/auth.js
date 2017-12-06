const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const User = require('../models/user');

const auth = {

    login: (req, res) => {
        let username = req.body.username || '';
        let password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        auth.validate(username, password, res);
    },

    validate: (username, password, res) => {
        // do the validation in here !
        User.findOne({"email": username, "password": password}, '-password', (err, user) => {
          if (err) throw err;
          if ( user && user.length > 0) {
            res.status(200).json(getToken(user));
          } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
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
