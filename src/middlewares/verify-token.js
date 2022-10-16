
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let token = req.headers['authorization'];

    if (token) {

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.iduser = payload.iduser
                next();
            }
        });

    } else {
        res.sendStatus(403)
    }

};
