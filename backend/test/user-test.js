process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));
const app = require('../app')
const User = require('../models/user');

describe('Users', () => {

    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    after(() => {

    });

    describe('/get/users', () => {
        it('it should GET all users', (done) => {
            chai.request(app)
                .get('/api/v1/users')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

    });
    describe('/ERROR_PAGE', () => {
        it('should return NOT FOUND', (done) => {
            chai.request(app)
                .get('/INVALID_PATH')
                .then((res) => {
                    throw new Error('Path exists!');
                })
                .catch((err) => {
                    expect(err).to.have.status(404);
                    done();
                });
        });
    });

    describe('POST /user', () => {
        it('should create new user', (done) => {
            let user = {
                "full_name": "Bosko Stupar",
                "email": "bosko.stupar@gmail.com",
                "password": "bosko123"
            };

            chai.request(app)
                .post('/api/v1/user')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);

                    done();
                })
        })
    })
    describe('GET /user/:id', () => {
        it('should fail to get one user', (done) => {
            chai.request(app)
                .get('/api/v1/user/1234567890ab')
                .then((res) => {
                    throw new Error('User exists!');
                })
                .catch((err) => {
                    expect(err).to.have.status(400);
                    done();
                });
        });

        it('shoud get single user', (done) => {
            let user = new User({ full_name: "Bosko Stupar", email: "bosko.stupar@gmail.com", password: "bosko123" });
            console.log(user._id);
            user.save((err, user) => {
                console.log(user._id);
                chai.request(app)
                    .get('/api/v1/user/' + user._id)
                    .then((res) => {
                        console.log(res.body);
                        expect(res).to.have.status(200);
                        expect(res).to.be.an('object');
                        expect(res.body).to.have.property('_id').eql(user._id);
                        done();
                    });
            });

        });
    });





});