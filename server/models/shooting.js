const mongoose = require('mongoose');
const schemaShooting = new mongoose.Schema({
  member: String,
  latestGameName: String,
  lastestScore: Number,
  latestGameDate: { type: Date, default: Date.now },
  best10M60R: Number,
  best10MLevel: String,
  best10MDate: { type: Date, default: Date.now },
  best50M3x40: Number,
  best50M3x40Level: String,
  best50M3x40Date: { type: Date, default: Date.now },
  bFilled: Boolean,
  best50M3x20: Number,
  best50M3x20Level: String,
  best50M3x20Date: { type: Date, default: Date.now },
  rankNational: Number,
  rankWorld: Number,
  linkISSF: String,
  linkVideo: String,
  bFilled: Boolean,
});

const table = mongoose.model('shooting', schemaShooting);
module.exports = table;
