const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const mongoose = require('mongoose');
const config = require('config');


let options = {
    useMongoClient: true,
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

if (config.util.getEnv('NODE_ENV') != 'test') {
    app.use(logger('combined'));
} else {
    app.use(logger('dev'));
}


app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
    // CORS Headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));

app.use((req, res) => {
    res.status(404);
    res.send('404: Not Found');
});

app.use((error, req, res, next) => {
    res.status(500);
    res.send('500: Internal server error');
});






const server = app.listen(port, function() {
    console.log("app is up");
});
module.exports = server;