const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const cors = require("cors");
const students = require("./students.json");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173']
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find()
    .then((cohortsArr) => {
      res.status(200).json(cohortsArr);
    })
    .catch((error) => {
      next(error)
    })
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohortDetails) => {
      res.status(200).json(cohortDetails);
    })
    .catch((error) => {
      next(error)
    });
});

app.post("/api/cohorts", (req, res, next) => {
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

app.put("/api/cohorts/:cohortId", (req, res, next) => {
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

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      next(error)
    });
});

app.get("/api/students", (req, res, next) => {
  Student.find()
  .populate("cohort")
    .then((studentsArr) => {
      res.status(200).json(studentsArr)
    })
    .catch((error) => {
      next(error)
    })
})

app.get("/api/students/:studentId", (req, res, next) => {

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

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
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

app.post("/api/students", (req, res, next) => {
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

app.put("/api/students/:studentId", (req, res, next) => {
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

app.delete("/api/students/:studentId", (req, res, next) => {
  const {studentId} = req.params;
  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      next(error)
    });
});

const {errorHandler, notFoundHandler} = require("./middleware/error-handling");

app.use(errorHandler);
app.use(notFoundHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});