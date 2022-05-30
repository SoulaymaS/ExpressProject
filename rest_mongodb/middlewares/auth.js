const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let token = req.headers['x-auth-token'] || req.headers['Authorization'];
    if (!token)
        return res.status(403).send('Token not found');
    try {
        token = token.replace("Bearer ", "");
        var payload = jwt.verify(token, 'secret');
    } catch (error) {
        return res.status(403).send(error.message);
    }
    req.payload = payload;
    next();
}