const mongoose = require('mongoose');
const teacher_schema = new mongoose.Schema({
    name: String,
    expertises: [String],
    cin: String,
    working_years: Number,
    classrooms: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassRoom'

        },
        name: String
    }]
});
let Teacher = mongoose.model('Teacher', teacher_schema);
module.exports.Teacher = Teacher;