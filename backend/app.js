const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.port || 3000;

app.use(logger('dev'));
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

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));

app.use((req, res) => {
    res.status(404);
    res.send('404: Not Found');
});

app.use((error, req, res, next) => {
    res.status(500);
    res.send('500: Internal server error');
});

MongoClient.connect('mongodb://localhost:27017/mflow', (err, db) => {
    if (err) throw err;
    db.createCollection('users', (err, res) => {
        if (err) throw err;
        db.close();
    });
    db.createCollection('projects', (err, res) => {
        if (err) throw err;
        db.close();
    });
});

const server = app.listen(port, function() {
    console.log("app is up");
});