const jwt = require('jsonwebtoken');
const storage = require('sessionstorage')
// Middleware for verifying JWT token
const authenticateJWT = (req, res, next) => {

    const token=req.cookies.token;
    console.log(token);
    if (!token) {
        console.log("redirected auth")
        return res.redirect('/');
    }

    jwt.verify(token, 'admin1234', (err, user) => {
        if (err) {
            return res.redirect('/');
        }
        next();
    });
};

// Middleware for verifying role as Student
const authenticateStudent = (req, res, next) => {
    const token=req.cookies.token;
    if (!token) {
        console.log("redirected auth")
        return res.redirect('/');
    }
    jwt.verify(token, 'admin1234', (err, user) => {
        if (err) {
            return res.redirect('/');
        }
        if(user.role!=='Student'){
            return res.send({message:"You are not a Student"})
        }
        next();
    });
};

// Middleware for verifying role as Teacher
const authenticateTeacher = (req, res, next) => {
    const token=req.cookies.token;
    if (!token) {
        console.log("redirected auth")
        return res.redirect('/');
    }
    jwt.verify(token, 'admin1234', (err, user) => {
        if (err) {
            return res.redirect('/');
        }
        if(user.role!=='Teacher'){
            return res.send({message:"You are not a Student"})
        }
        next();
    });
};

module.exports = { authenticateJWT, authenticateStudent, authenticateTeacher };
