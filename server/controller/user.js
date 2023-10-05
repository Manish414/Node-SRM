const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = 'admin1234';


exports.register = async (req, res) => {
    let user = await userModel.exists({ email: req.body.email });
    if (user) {
        return res.status(400).send({ message: 'User already registered' })
    } else {
        user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user
            .save()
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some Error Occured while Adding Record"
                })
            })

    }
}



exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send('Incorrect Email or Password');
        }

        if(user.role!=='Student'){
            return res.status(400).send('You are not a Student');
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if (!validatePassword) {
            return res.status(400).send({ message: 'Incorrect Password' });
        }

        // Generate JWT token with role in payload
        const token = jwt.sign({ role: user.role }, secretKey, { expiresIn: '1h' });

        // Store token in sessionStorage
        res.cookie('token',token);
        res.redirect('/result');
    } catch (error) {
        res.status(400).json({ message: 'Login Failed' });
    }
};

exports.loginTeacher = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send('Incorrect Email or Password');
        }

        if(user.role!=='Teacher'){
            return res.status(400).send('You are not a Teacher');
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if (!validatePassword) {
            return res.status(400).send({ message: 'Incorrect Password' });
        }
        const token = jwt.sign({ role: user.role }, secretKey, { expiresIn: '1h' });
       
        res.cookie('token',token);
        res.redirect('/records');

        
    } catch (error) {
        res.status(400).json({ message: 'Login Failed' });
    }
};


exports.logout = async(req,res)=>{
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        res.status(400).send({message:"Logout Failed"})
    }
}