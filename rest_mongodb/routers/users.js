const router = require('express').Router();
const { User } = require('../models/user');
const userDebugger = require('debug')('app:user');
const auth = require('../middelwares/auth');

router.post('/register', async(req, res) => {
    let user = new User(req.body);

    user.password = await user.hash_password(req.body.password);
    userDebugger('password :', user.password)

    await user.save();
    res.status(201).send(user);
});

router.post('/login', async(req, res) => {
    let username = req.body.username;
    let user = await User.findOne({ username: username });
    if (!user)
        return res.status(400).send('Username or password incorrect');
    let password = req.body.password
    try {
        let bool = await user.verify_password(password, user.password);
        if (!bool)
            return res.status(400).send('Username or password incorrect');
        let token = user.create_jwt({ username: user.username, email: user.email }, { expiresIn: '1m' });
        res.header('x-auth-token', token).send('User logged in.')
    } catch (error) {
        res.status(500).send('Problem with Bcrypt Compare : ' + error.message)
    }

});

router.get('/me', auth, async(req, res) => {

    res.send('My username is :' + req.payload.username)
});


module.exports = router;