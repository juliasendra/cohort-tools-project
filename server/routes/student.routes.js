const router = require("express").Router();
const Student = require('../models/Student.model')



router.get("/students", (req, res, next) => {
    Student.find()
    .populate("cohort")
      .then((studentsArr) => {
        res.status(200).json(studentsArr)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.get("/students/:studentId", (req, res, next) => {
  
    const { studentId } = req.params;
  
    Student.findById(studentId)
      .populate("cohort")
      .then((studentDetails) => {
        res.status(200).json(studentDetails)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.get("/students/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
  
    Cohort.findById(cohortId)
      .populate("cohort")
      .then((cohortDetails) => {
        res.status(200).json(cohortDetails)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.post("/students", (req, res, next) => {
    const { firstName, lastName, email, phone, linkedinUrl, languages, program, projects, cohort } = req.body;
    const newRequestBody = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      projects,
      cohort
    }
  
    Student.create(newRequestBody)
      .then((createdStudent) => {
        res.status(201).json(createdStudent)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.put("/students/:studentId", (req, res, next) => {
  const {studentId} = req.params;
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, projects, cohort } = req.body;
    const newRequestBody = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      projects,
      cohort
    }
  
    Student.findByIdAndUpdate(studentId,newRequestBody,{new:true})
      .then((updatedStudent) => {
        res.status(200).json(updatedStudent)
      })
      .catch((error) => {
        next(error)
      });
  });
  
  router.delete("/students/:studentId", (req, res, next) => {
    const {studentId} = req.params;
    Student.findByIdAndDelete(studentId)
      .then(() => {
        res.status(204).send()
      })
      .catch((error) => {
        next(error)
      });
  });
  module.exports = router;