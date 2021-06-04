const { Double } = require('bson');
const mongoose = require('mongoose');

const schemaBaseballInfo = new mongoose.Schema({
    ChineseName: String,
    Gender: String,
    GradDate: { type: Date, default: Date.now },
    Height: Number,
    LeftRightHand: String,
    PassportName: String,
    PriPosition: String,
    SecPosition: String,
    Weight: Number,
    bFilled: Boolean,
    currentGrad: String,
});

const table = mongoose.model('baseballInfos', schemaBaseballInfo);
module.exports = table;