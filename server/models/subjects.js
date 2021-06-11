const mongoose = require('mongoose');
const schemaSubjects = new mongoose.Schema({
  member: String,
  GPA: Number,
  AVG: Number,
  TOFEL: Number,
  IELTS: Number,
  TOEIC: Number,
  SAT: Number,
  ACT: Number,
  IntentMajor: String,
  bFilled: Boolean,
});

const table = mongoose.model('achievements', schemaSubjects);
module.exports = table;
