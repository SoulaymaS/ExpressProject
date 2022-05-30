require('./db/connect')
const express = require('express');
const appDebug = require('debug')('app:debug')
const student_router = require('./routers/students')
const classRoom_router = require('./routers/classRooms')
const teacher_router = require('./routers/teachers');
const auth = require('./middlewares/auth')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use('/api/students', student_router)
app.use('/api/classRooms', classRoom_router);
app.use('/api/teachers', auth, teacher_router);
app.listen(port, () => appDebug(`server run on ${port}`))