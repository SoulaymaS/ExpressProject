const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let user_schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    email: { type: String, required: true }
});

user_schema.methods.hash_password = async(password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
user_schema.methods.verify_password = async(password, db_password) => {
    return await bcrypt.compare(password, db_password);
};
user_schema.methods.create_jwt = (payload, expires) => {
    return 'Bearer ' + jwt.sign(payload, 'secret', expires);
};

let User = mongoose.model('User', user_schema);

module.exports.User = User;