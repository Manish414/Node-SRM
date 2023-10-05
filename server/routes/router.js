const express = require('express');
const route = express.Router();
const services = require('../services/render');
const record = require('../controller/record');
const user = require('../controller/user');
const result = require('../controller/result');
const { authenticateJWT, authenticateStudent, authenticateTeacher } = require('../middleware/authMiddleware');

route.get('/',services.homeRoutes);

// Student routes
route.get('/result',authenticateStudent, services.searchRoutes);

// Teacher routes
route.get('/records',  authenticateTeacher, services.recordsRoutes);
route.get('/addRecord',  authenticateTeacher, services.addRoutes);
route.get('/updateRecord',  authenticateTeacher, services.updateRoutes);

// General routes
route.get('/register', services.registerRoutes);
route.get('/login', services.loginRoutes);
route.get('/teacherLogin', services.teacherLoginRoutes);

//API record can only be accessed by teacher
route.post('/api/record',  authenticateTeacher, record.create);
route.get('/api/record',  authenticateTeacher, record.find);
route.post('/api/record/:id',  authenticateTeacher, record.update);
route.delete('/api/record/:id',  authenticateTeacher, record.delete);

//API User
route.post('/api/register', user.register);
route.post('/api/login', user.login);
route.post('/api/loginteacher', user.loginTeacher);
route.post('/api/logout', user.logout);

//API SearchResult
route.get('/api/result',   result.find);

module.exports = route;
