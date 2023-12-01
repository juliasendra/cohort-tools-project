const router = require("express").Router();
const Cohort = require('../models/Cohort.model')

router.get("/cohorts", (req, res, next) => {
    Cohort.find()
      .then((cohortsArr) => {
        res.status(200).json(cohortsArr);
      })
      .catch((error) => {
        next(error)
      })
  });
  
  router.get("/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Cohort.findById(cohortId)
      .then((cohortDetails) => {
        res.status(200).json(cohortDetails);
      })
      .catch((error) => {
        next(error)
      });
  });
  
  router.post("/cohorts", (req, res, next) => {
    const { inProgress, cohortSlug, cohortName,
      program, campus, startDate, endDate, programManager,
      leadTeacher, totalHours } = req.body;
  
    const newRequestBody = {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours
    }
  
    Cohort.create(newRequestBody)
      .then((createdCohort) => {
        res.status(201).json(createdCohort)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.put("/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
  
    const { inProgress, cohortSlug, cohortName,
      program, campus, startDate, endDate, programManager,
      leadTeacher, totalHours } = req.body;
  
    const newRequestBody = {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours
    }
  
    Cohort.findByIdAndUpdate(cohortId, newRequestBody,{new:true})
      .then((updatedCohort) => {
        res.status(200).json(updatedCohort)
      }).catch(() => {
        next(error)
      });
  })
  
  router.delete("/cohorts/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Cohort.findByIdAndDelete(cohortId)
      .then(() => {
        res.status(204).send()
      })
      .catch((error) => {
        next(error)
      });
  });
  module.exports = router;