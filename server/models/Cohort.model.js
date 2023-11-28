
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
	//_id: Schema.Types.ObjectId,//
	inProgress : Boolean,
	cohortSlug : String,
	cohortName : String,
	program    : String,
    	campus     : String,
    	startDate  : Date,
    	endDate    : Date,
    	programManager : String,
    	leadTeacher: String,
    	totalHours : Number
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
