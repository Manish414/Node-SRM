const { query } = require('express');
const StudentRecord=require('../model/recordModel');



exports.find = async (req, res) => {
    try {
        if (req.query) {
            console.log(req.query)
            const searchRollno = req.query.rollno;
            const searchDob = new Date(req.query.dob);
            const record = await StudentRecord.findOne({ rollno: searchRollno, dob:searchDob});
            console.log(record)
            if (record) {
                res.status(200).send(record);
            } else {
                res.send({ message: "No Record Found" });
            }
        } else {
            res.status(400).send({ message: "Invalid query parameters" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
