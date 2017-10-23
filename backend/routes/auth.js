const jwt = require('jwt-simple');

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

        let dbUserObj = auth.validate(username, password);

        if (!dbUserObj) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        if (dbUserObj) {
            // generate token and dispatch it to the client
            res.json(genToken(dbUserObj));
        }
    },

    validate: (username, password) => {
        // do the validation in here !
        let dbUserObj = {};
        return dbUserObj;

    }
}

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
}

expiresIn = (numDays) => {
    let dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;