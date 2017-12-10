const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
});

module.exports = mongoose.model('user', UserSchema);
