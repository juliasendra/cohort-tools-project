
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	//_id: Schema.Types.ObjectId,//
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	linkedinUrl: String,
	languages: { type: String, enum: ["English", "Dutch", "Portuguese", "French","Spanish","German"] },
	program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics"] },
	background: String,
	image: String,
	projects: [],
	cohort: {
		   type: Schema.Types.ObjectId,
      		   ref: "Cohort"
		}
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
