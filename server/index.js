const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiPort = 3001;

const ModelMembers = require('./models/members');
const ModelBaseballInfo = require('./models/baseballinfos');
const Members = require('./routers/crudMembers');

mongoose.connect(
  'mongodb+srv://yogi:askYogi0325@cluster0.qgucu.mongodb.net/asia-scouting?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/asia-scouting/members/', Members);

app.get('/', async (req, res) => {
  const member = new ModelMembers({
    email: 'yogifang@gmail.com',
    password: '123456',
    bEUcitizen: false,
    bFilled: false,
    bPrivacy: false,
    summitDate: '2021-05-30',
  });
  const baseballInfo = new ModelBaseballInfo({});
  try {
    await member.save();
    console.log('here.......');
    res.send('data is saved');
  } catch (err) {
    console.log(err);
  }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
