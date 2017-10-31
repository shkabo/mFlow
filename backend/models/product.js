const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false },
}, {
    versionKey: false
});

ProductSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createAt = now;
    }
    next();
});

module.exports = mongoose.model('product', ProductSchema);