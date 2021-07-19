const { Schema, model } = require('mongoose');

const programSchema = new Schema({
    programTitle: {
        type: String,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    programDescription: {
        type: String,
        minlength: 1,
        maxlength: 256,
        trim: true,
    },
    programTrainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
    },
    programClasses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Class',
        },
    ],
    programDateTimeStart: {
        type: Date,
        default: Date.now,
    },
    programDateTimeEnd: {
        type: Date,
        default: () => Date.now() + 30*60*60*1000
    },
    programClassPrereqs: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Class',
        },
    ],
    programProgramPrereqs: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Program',
        },
    ],

});

const Program = model('Program', programSchema);

module.exports = Program;