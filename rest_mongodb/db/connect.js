const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:1234@cluster0.fdwmq.mongodb.net/school?retryWrites=true&w=majority')
    .then(() => console.log('MOngoDB is UP.'))
    .catch(err => console.log('MongoDB is down, raison:', err.message))