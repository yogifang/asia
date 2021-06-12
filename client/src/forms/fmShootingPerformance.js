import React, { useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import Context from '../components/stores';
import axios from '../components/axios';
import { useForm, Form } from '../components/useForm';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

const initialFValues = {
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
  bFilled: false,
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
  const [startDate, setStartDate] = useState(new Date());
  const { recMember, setMember } = useContext(Context);
  const { hidePart2, setHide2 } = useState(false);

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

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values);
      resetForm();
    }
  };
  const handleClick = async (e) => {
    console.log(values);
    console.log(recMember.email);
    values.member = recMember.email;
    await axios.post('/asia-scouting/shooting/', values);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#1B1464',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        borderColor: '#ff',
      };
    },
    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      margin: '0px',
      padding: '0px , 0px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <div>
          <div className='div-scroll'>
            <div className='row'>
              <button type='button' className='btn-save' />
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
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
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
                      value=''
                      options={optionsGameLevel}
                      onChange={(e) => {
                        values.best10MLevel = e.target;
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
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
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
                      name='best10MLevel'
                      autosize={true}
                      value={values.best10MLevel.value}
                      options={optionsGameLevel}
                      onChange={(e) => {
                        values.best50M3x40 = e.target;
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
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
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
                      name='best10MLevel'
                      autosize={true}
                      value={values.best10MLevel.value}
                      options={optionsGameLevel}
                      onChange={(e) => {
                        values.best50M3x40 = e.target;
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
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
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
                <Button variant='contained' color='primary' onClick={handleClick}>
                  儲存資料
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Grid>{' '}
    </Form>
  );
}
