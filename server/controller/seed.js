const mongoose = require('mongoose');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const seedUser = async () => {
  try {
    let user = await userModel.findOne({ email: process.env.email });

    if (user) {
      console.log("Teacher already exists");
    } else {
      user = new userModel({
        name: process.env.name,
        email: process.env.email,
        password: process.env.password,
        role: process.env.role
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      user.save()
        .then(data => {
        console.log("Teacher Seeded")
        })
        .catch(err => {
        console.log(err)
        });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = seedUser;
