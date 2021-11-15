const jwt = require('jsonwebtoken');

// Vérification du Token de l'utilisateur
// On regarde si ça correspond au Id de l'utilisateur dans req.body.userId
module.exports = (req, res, next) => {
    console.log(req.headers)
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch(error) {
        console.log(error)
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};