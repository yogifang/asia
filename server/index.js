const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiPort = 3001;

const ModelMembers = require('./models/members');
const ModelBaseballInfos = require('./models/baseballinfos');
const ModelBaseballPerformances = require('./models/performance');
const ModelContacts = require('./models/contacts');

const Members = require('./routers/crudMembers');
const BaseballInfos = require('./routers/crudBaseballInfos');
const BaseballPerformances = require('./routers/crudBaseballPerformance');
const Contacts = require('./routers/crudContacts');
const Subjects = require('./routers/crudSubjects');
const Shooting = require('./routers/crudShooting');

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
app.use('/asia-scouting/baseballinfos/', BaseballInfos);
app.use('/asia-scouting/baseballperformance/', BaseballPerformances);
app.use('/asia-scouting/contacts/', Contacts);
app.use('/asia-scouting/subjects/', Subjects);
app.use('/asia-scouting/shooting/', Shooting);
app.get('/', async (req, res) => {
  const member = new ModelMembers({
    email: 'yogifang@gmail.com',
    password: '1234567aaaaa',
    bEUcitizen: false,
    bFilled: false,
    bPrivacy: false,
    summitDate: '2021-05-30',
  });
  const baseballInfo = new ModelBaseballInfos({
    ChineseName: '方宗岱',
    Gender: 'Male',
    GradDate: '2021-06-04',
    Height: 180,
    LeftRightHand: 'left',
    PassportName: 'String',
    PriPosition: 'String',
    SecPosition: 'String',
    Weight: 100,
    bFilled: false,
    currentGrad: 'String',
    member: 'yogifang@gmail.com',
  });
  const baseballPer = new ModelBaseballPerformances({
    member: '',
    TenYardSplit: 0,
    SixtyYardSplit: 0,
    Throwing: 0,
    BlockPitch: 0,
    ERA: 0,
    gamesP: 0,
    AVG: 0,
    ER: 0,
    EXIT: 0,
    HB: 0,
    HR: 0,
    IP: 0,
    K: 0,
    OPS: 0,
    gamesH: 0,
    BB: 0,
    BBB: 0,
    BH: 0,
    BHR: 0,
    BK: 0,
  });
  try {
    await baseballPer.save();
    console.log('here....baseball Info...');
    res.send('data is saved----');
  } catch (err) {
    console.log(err);
  }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
