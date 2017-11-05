const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: false, default: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    created: { type: Date, default: Date.now }
}, {
  versionKey: false
});


ProjectSchema.pre('save', (next) => {
    now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

module.exports = mongoose.model('project', ProjectSchema);
