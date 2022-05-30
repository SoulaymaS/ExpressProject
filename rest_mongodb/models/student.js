const mongoose = require('mongoose');
const student_schema = new mongoose.Schema({
    name: String,
    age: Number,
    class: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassRoom'
    }
});
let Student = mongoose.model('Student', student_schema);

module.exports.Student = Student;