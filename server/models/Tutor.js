const {Schema, model } = require('mongoose');

const tutorSchema = new Schema({
    tutorTitle: {
        type: String,
        requred: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    tutorTrainer: {
        type: Schema.Type.ObjectID,
        ref: 'Trainer',
    },
    tutorDateTimeStart: {
        type: Date,
        default: Date.now,
    },
    tutorDateTimeEnd: {
        type: Date,
        default: () => Date.now() + 1*60*60*1000,
    },
});

const Tutor = model('Tutor', tutorSchema);
module.exports = Tutor;