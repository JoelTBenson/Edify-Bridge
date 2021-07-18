const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const classSchema = new Schema({
    classTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    classDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256,
        trim: true,
    }
    classInstructor: {
        type: Schema.Types.ObjectID,
        ref: 'Trainer',
    },
    classLocation: {
        type: String,
        required: true,
        trim: true,
    },
    classDateTimeStart: {
        type: Date,
        default: Date.now,
    },
    classDateTimeEnd: {
        type: Date,
        default: () => Date.now() + 1*60*60*1000 ,
    },
    classPrereqs: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        },
    ],
});

const Class = model('Class', classSchema);

module.exports = Class;