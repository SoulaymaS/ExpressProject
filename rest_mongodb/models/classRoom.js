const mongoose = require('mongoose');
const classRoom_schema = new mongoose.Schema({
    name: String,
    price: Number,
    nb_students: Number,
    active: Boolean,
    tags: [String], //["test", "test1", "test3"],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
})
let ClassRoom = mongoose.model('ClassRoom', classRoom_schema);
module.exports.ClassRoom = ClassRoom;