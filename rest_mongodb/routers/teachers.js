const router = require('express').Router();
const { Teacher } = require('../models/teacher');
const { ClassRoom } = require('../models/classRoom');
const teacherDebugger = require('debug')('app:teachers')

router.post('/', async(req, res) => {

    let teacher = new Teacher(req.body);

    try {
        teacher = await teacher.save();
        return res.send(teacher)
    } catch (error) {
        res.send(405).send(error.message);
    }
});

router.put('/:id_teacher/add/class/:id_class', async(req, res) => {

    let teacher = await Teacher.findById(req.params.id_teacher);
    if (!teacher)
        return res.status(404).send('Teacher not found');

    let classRoom = await ClassRoom.findById(req.params.id_class);
    if (!classRoom)
        return res.status(404).send('ClassRoom not found');
    try {
        //update of teacher
        let classObjRelation = {
            _id: classRoom._id,
            name: classRoom.name
        }
        teacher.classrooms.push(classObjRelation);
        teacher = await teacher.save();
        classRoom.teachers.push(teacher._id);
        await classRoom.save();
        return res.send(teacher)
    } catch (error) {
        res.send(405).send(error.message);
    }
});

router.put('/:id_teacher/remove/class/:id_class', async(req, res) => {

    let teacher = await Teacher.findById(req.params.id_teacher);
    if (!teacher)
        return res.status(404).send('Teacher not found');

    let classRoom = await ClassRoom.findById(req.params.id_class);
    if (!classRoom)
        return res.status(404).send('ClassRoom not found');
    try {
        //update of teacher
        teacher.classrooms = teacher.classrooms.filter(cl => !cl._id.equals(classRoom._id));
        teacher = await teacher.save();
        classRoom.teachers = classRoom.teachers.filter(t => !t.equals(teacher._id));
        await classRoom.save();
        return res.send(teacher)
    } catch (error) {
        res.send(405).send(error.message);
    }
});

router.delete('/id/:id_teacher', async(req, res) => {
    let teacher = await Teacher.findById(req.params.id_teacher);
    if (!teacher)
        return res.status(404).send('Teacher not found');
    try {
        for (let index = 0; index < teacher.classrooms.length; index++) {
            const cl = teacher.classrooms[index];
            let classRoom = await ClassRoom.findById(cl._id);
            classRoom.teachers = classRoom.teachers.filter(t => !t.equals(teacher._id));
            await classRoom.save();
        }
    } catch (error) {
        teacherDebugger('Error in savinge class after delete', error.message);
        return res.status(500).send('Error in savinge class after delete')
    }
    try {
        await Teacher.deleteOne({ _id: req.params.id_teacher });
    } catch (error) {
        teacherDebugger('Error in deleting Teacher', error.message);
        return res.status(500).send('Error in deleting Teacher');

    }

    res.send(teacher);


});

module.exports = router