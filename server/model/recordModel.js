const mongoose = require('mongoose')

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
})
const StudentRecord= mongoose.model('StudentRecord',schema)
module.exports=StudentRecord