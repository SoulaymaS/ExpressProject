const router = require('express').Router();
const { ClassRoom } = require('../models/classRoom');

//save ClassRoom
router.post('/add', async(req, res) => {
    let classRoom = new ClassRoom(req.body);
    try {
        classRoom.nb_students = 0;
        classRoom.students = [];
        classRoom = await classRoom.save();
        res.send(classRoom);
    } catch (error) {
        res.send(405).send(error.message);
    }
});
//get all classrooms
router.get('/all', async(req, res) => {
    let classRooms = await ClassRoom.find();
    res.send(classRooms);
});
//find by Id
router.get('/:id', async(req, res) => {
    let classRoom = await ClassRoom.findById(req.params.id);
    if (!classRoom)
        return res.status(404).send('Class not found')
    res.send(classRoom)
})
module.exports = router