const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser=require('cookie-parser')

const connectDB=require('./server/database/connection')
const seed=require('./server/controller/seed')
const app = express();
app.use(cookieParser());
//config dotnev
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

//mongoDB Connection
connectDB();

//Seed Teacher
seed();

//parse req to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'assets')))

// Set up the view engine and views directory
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'));

// // load routers
app.use('/', require('./server/routes/router'))
app.use('/addRecord', require('./server/routes/router'))
app.use('/updateRecord', require('./server/routes/router'))
app.use('/records', require('./server/routes/router'))
app.use('/register', require('./server/routes/router'))
app.use('/login', require('./server/routes/router'))
app.use('/result', require('./server/routes/router'))
app.use('/teacherLogin', require('./server/routes/router'))


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
