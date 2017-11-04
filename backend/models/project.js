const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    user_id: { type: ObjectId, required: true },
    created: { type: Date, required: true }
});

ProjectSchema.pre('save', next => {
    now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

module.exports = mongoose.model('project', ProjectSchema);