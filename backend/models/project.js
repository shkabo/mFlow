const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, required: true }
}, {
  versionKey: false
});

ProjectSchema.pre('save', next => {
    now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

module.exports = mongoose.model('project', ProjectSchema);
