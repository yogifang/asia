const mongoose = require('mongoose');
const schemaContacts = new mongoose.Schema({
  email: String,
  birthday: { type: Date, default: Date.now },
  school: String,
  liveCity: String,
  Nationality: String,
  links: String,
  member: String,
  bFilled: Boolean,
});

const table = mongoose.model('contacts', schemaContacts);
module.exports = table;
