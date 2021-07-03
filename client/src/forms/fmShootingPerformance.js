import React, { useState, useContext, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import Context from '../components/stores';
import axios from '../components/axios';
import { useForm, Form } from '../components/useForm';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import customStyles from './customStyles';
import saveImage from '../assets/buttons/next.png'

const initialFValues = {
  _id: '',
  member: '',
  latestGameName: '',
  lastestScore: 0,
  latestGameDate: Date.now(),
  best10M60R: 0,
  best10MLevel: '',
  best10MDate: Date.now(),
  best50M3x40: 0,
  best50M3x40Level: '',
  best50M3x40Date: Date.now(),
  best50M3x20: 0,
  best50M3x20Level: '',
  best50M3x20Date: Date.now(),
  rankNational: 0,
  rankWorld: 0,
  linkISSF: '',
  linkVideo: '',
  bFilled: false,
};

const optionsGameLevel = [
  { value: '1', label: '奧運' },
  { value: '2', label: '奧運資格賽/世錦賽/世界盃/世大運' },
  { value: '3', label: '亞運/亞錦賽/亞洲盃' },
  { value: '4', label: '其他' },
];

export default function ShootingPerformance() {
  const [latestGameDate, setLatestGameDate] = useState(new Date());
  const [best10MDate, setBest10MDate] = useState(new Date());
  const [best50M3x40Date, setBest50M3x40Date] = useState(new Date());
  const [best50M3x20Date, setBest50M3x20Date] = useState(new Date());
  const [selBest10MLevel, setSelBest10MLevel] = useState(optionsGameLevel[0]);
  const [selBest50M3x20Level, setSelBest50M3x20Level] = useState(optionsGameLevel[0]);
  const [selBest50M3x40Level, setSelBest50M3x40Level] = useState(optionsGameLevel[0]);
  const { memberEmail, setMemberEmail } = useContext(Context);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('rankDomestic' in fieldValues) temp.rankDomestic = fieldValues.rankDomestic ? '' : 'This field is required.';
    if ('englishName' in fieldValues) temp.englishName = fieldValues.englishName ? '' : 'This field is required.';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;
    //console.log(options[4].label);
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  useEffect(() => {
    async function fetchData() {
      //recMember.email = 'yogifang@gmail.com';
      const Data = await axios.get(`/asia-scouting/shooting/?member=${memberEmail}`);
      console.log('getdata..................');
      console.log(Data.data);
      if (Data.data === null) return;
      let field;
      let nValues = {};
      for (field in values) {
        console.log(field);
        //console.log(Data.data[field]);
        nValues[field] = Data.data[field];
      }
      setValues(nValues);
      setLatestGameDate(new Date(nValues.latestGameDate));
      setBest10MDate(new Date(nValues.best10MDate));
      setBest50M3x20Date(new Date(nValues.best50M3x20Date));
      setBest50M3x40Date(new Date(nValues.best50M3x40Date));
      let index = findIndexByValue(optionsGameLevel, nValues.best10MLevel);
      setSelBest10MLevel(optionsGameLevel[index]);
      index = findIndexByValue(optionsGameLevel, nValues.best50M3x20Level);
      setSelBest50M3x20Level(optionsGameLevel[index]);
      index = findIndexByValue(optionsGameLevel, nValues.best50M3x40Level);
      setSelBest50M3x40Level(optionsGameLevel[index]);

      console.log(index);
    }
    fetchData();
    //values.member = recMember.email ;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values);
      resetForm();
    }
  };
  const handleClick = async (e) => {
    console.log(values);
    console.log(memberEmail);
    values.member = memberEmail;
    if (values._id === '') {
      await axios.post('/asia-scouting/shooting/', values);
    } else {
      await axios.put('/asia-scouting/shooting/', values);
    }
    alert('Data is Saved!!');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
          <div className='div-scroll'>
            <div className='row'>
              <div className='col s12 center-align'>
                <p>
                  <span className='text-purple'>射擊成績及運動表現</span>
                  <br />
                  <span className='text-orange'>若以下資料有不便回答者 可填入N</span>
                </p>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>最近一次比賽名稱</label>
                    <label className='small' htmlFor>
                      Latest Competition Name
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_height'
                      className='validate'
                      name='latestGameName'
                      onChange={handleInputChange}
                      value={values.latestGameName}
                      type='text'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>最近一次比賽成績</label>
                    <label className='small' htmlFor>
                      Latest Competition Results
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_height'
                      className='validate'
                      name='lastestScore'
                      onChange={handleInputChange}
                      value={values.lastestScore}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>比賽日期</label>
                    <label className='small' htmlFor>
                      Date
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <DatePicker
                      name='latestGameDate'
                      selected={latestGameDate}
                      onChange={(date) => {
                        setLatestGameDate(new Date(date));
                        values.latestGameDate = date;
                      }}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      scrollableYearDropdown
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>10米生涯最佳成績（60發）</label>
                    <label className='small' htmlFor>
                      10M Air Rifle Record (60 shots)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='best10M60R'
                      onChange={handleInputChange}
                      value={values.best10M60R}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>在哪一層級之賽事達到該成績</label>
                    <label className='small' htmlFor>
                      Record Broken in What Level
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      id='user_nationality'
                      placeholder='Select Level'
                      className='browser-default col s6 mb-2'
                      name='best10MLevel'
                      autosize={true}
                      value={selBest10MLevel}
                      options={optionsGameLevel}
                      onChange={(e) => {
                        setSelBest10MLevel(e);
                        values.best10MLevel = e.label;
                      }}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>比賽日期</label>
                    <label className='small' htmlFor>
                      Date
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <DatePicker
                      name='best10MDate'
                      selected={best10MDate}
                      onChange={(date) => {
                        setBest10MDate(new Date(date));
                        values.best10MDate = date;
                      }}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      scrollableYearDropdown
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>50米生涯最佳成績（3x40）</label>
                    <label className='small' htmlFor>
                      50M Rifle Record (3x40)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='best50M3x40'
                      onChange={handleInputChange}
                      value={values.best50M3x40}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor='user_nationality'>在哪一層級之賽事達到該成績</label>
                    <label className='small' htmlFor='user_nationality'>
                      Record Broken in What Level
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      id='user_nationality'
                      placeholder='Select Level'
                      className='browser-default col s6 mb-2'
                      name='best50M3x40Level'
                      autosize={true}
                      value={selBest50M3x40Level}
                      options={optionsGameLevel}
                      onChange={(e) => {
                        setSelBest50M3x40Level(e);
                        values.best50M3x40Level = e.label;
                      }}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>比賽日期</label>
                    <label className='small' htmlFor>
                      Date
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <DatePicker
                      name='best50M3x40Date'
                      selected={best50M3x40Date}
                      onChange={(date) => {
                        setBest50M3x40Date(new Date(date));
                        values.best50M3x40Date = date;
                      }}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      scrollableYearDropdown
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>50米生涯最佳成績（3x20）</label>
                    <label className='small' htmlFor>
                      50M Rifle Record (3x20)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='best50M3x20'
                      onChange={handleInputChange}
                      value={values.best50M3x20}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor='user_nationality'>在哪一層級之賽事達到該成績</label>
                    <label className='small' htmlFor='user_nationality'>
                      Record Broken in What Level
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      id='user_nationality'
                      placeholder='Select Level'
                      className='browser-default col s6 mb-2'
                      name='best50M3x20Level'
                      autosize={true}
                      value={selBest50M3x20Level}
                      options={optionsGameLevel}
                      onChange={(e) => {
                        setSelBest50M3x20Level(e);
                        values.best50M3x20Level = e.target;
                      }}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>比賽日期</label>
                    <label className='small' htmlFor>
                      Date
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <DatePicker
                      name='best50M3x20Date'
                      selected={best50M3x20Date}
                      onChange={(date) => {
                        setBest50M3x20Date(new Date(date));
                        values.best50M3x20Date = date;
                      }}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      scrollableYearDropdown
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>國內排名</label>
                    <label className='small' htmlFor>
                      National Rank
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='rankNational'
                      onChange={handleInputChange}
                      value={values.rankNational}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>世界排名</label>
                    <label className='small' htmlFor>
                      World Rank
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='rankWorld'
                      onChange={handleInputChange}
                      value={values.rankWorld}
                      type='number'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>ISSF 官網選手連結</label>
                    <label className='small' htmlFor>
                      ISSF Profile Link
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='linkISSF'
                      onChange={handleInputChange}
                      value={values.linkISSF}
                      type='text'
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4 right-align'>
                  <div className='mb-3'>
                    <label htmlFor>比賽或訓練影片</label>
                    <label className='small' htmlFor>
                      Showcasing Vidoes
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id=''
                      className='validate'
                      name='linkVideo'
                      onChange={handleInputChange}
                      value={values.linkVideo}
                      type='text'
                    />
                  </div>
                </div>
              </div>
              <Button
                className='btn-save'
                variant='contained'
                color='primary'
                onClick={handleClick}
                style={{ backgroundImage: 'url(' + saveImage + ')' }}
              ></Button>
            </div>
          </div>
      </Grid>{' '}
    </Form>
  );
}
