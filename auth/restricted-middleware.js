const jwt = require('jsonwebtoken');

function restrict(role) {
    const roles = ['basic', 'admin', 'ceo'];

    return async (req, res, next) => {
        console.log(process.env.JWT_SECRET)
        
        const auth = {
            message: 'Please sign in'
        }

        try {
            const token = req.headers.authorization;

            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    return res.status(401).json(auth);
                } else if(role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
                    return res.status(403).json({message: 'Classified'});
                }

                req.token = decoded;
                next();
            })
        } catch {
            next(error)
        }
    }
}

module.exports = {
    restrict
}