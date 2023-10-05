const { query } = require('express');
const StudentRecord = require('../model/recordModel');

// create and save new Record

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Form cannot be empty" });
        return;
    }

    let rollno = await StudentRecord.findOne({ rollno: req.body.rollno });
    if (rollno) {
        return res.send({ message: "Rollno should be unique" })
    }

    const Dob = new Date(req.body.dob);
    console.log(Dob)
    const record = new StudentRecord({
        name: req.body.name,
        rollno: req.body.rollno,
        dob: Dob,
        semester: req.body.semester,
        score: req.body.score
    });

    record
        .save()
        .then(data => {
            res.redirect('/records');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Error Occurred while Adding Record"
            });
        });
};

//get record's'



exports.find = (req, res) => {

    try {
        if (req.query.id) {
            const id = req.query.id

            StudentRecord.findById(id)
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: "No Record Found with id " + id })
                    } else {
                        res.send(data)
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: "Error fetching single record" })
                })
        } else {
            StudentRecord.find()
                .then(record => {
                    res.send(record)
                })
                .catch(err => {
                    res.status(500).send({
                        messgae: err.message || "Error occured while retriving student record"
                    })
                })
        }

    } catch (error) {
        res.send(error);
    }
}

//update record 

exports.update = (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update cannot be empty" });
        }

        const id = req.params.id;

        StudentRecord.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update record with id=${id}. Record not found.` });
                } else {
                    res.redirect('/records')
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error updating record with id=" + id });
            });
    } catch (error) {
        res.send(error)
    }
};


//delete record

exports.delete = (req, res) => {
    try {
        const id = req.params.id;

        StudentRecord.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot delete record with id=${id}. Record not found.` });
                } else {
                    res.send({ message: "Record was deleted successfully." });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Could not delete record with id=" + id });
            });
    } catch (error) {
        res.send(error);
    }
};
