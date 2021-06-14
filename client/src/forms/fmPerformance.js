import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import axios from '../components/axios';
import Context from '../components/stores';
import DatePicker from 'react-datepicker';
import saveImage from '../assets/buttons/save.png';

const initialFValues = {
  _id: '',
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
  BRUN: 0,
  RUN: 0,
  Hit2B: 0,
  Hit3B: 0,
  Hits: 0,
  lAVG: 0,
  lBB: 0,
  lBBB: 0,
  lBH: 0,
  lBHR: 0,
  lBK: 0,
  lBRUN: 0,
  lER: 0,
  lERA: 0,
  lHB: 0,
  lHit2B: 0,
  lHit3B: 0,
  lHitHR: 0,
  lHits: 0,
  lIP: 0,
  lK: 0,
  lOPS: 0,
  lRUN: 0,
  AB: 0,
  latestGameDate: Date.now(),
  latestGameName: '',
  bFilled: false,
};

export default function BaseballPerformance() {
  const { hidePart2, setHide2 } = useState(false);
  const [latestGameDate, setLatestGameDate] = useState(new Date());
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

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );
  useEffect(() => {
    async function fetchData() {
      // recMember.email = 'yogifang@gmail.com';
      console.log(memberEmail);
      const Data = await axios.get(`/asia-scouting/baseballperformance/?member=${memberEmail}`);
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
      console.log('post');
      await axios.post('/asia-scouting/baseballperformance/', values);
    } else {
      console.log('put');
      await axios.put('/asia-scouting/baseballperformance/', values);
    }
    alert('Data is Saved!!');
  };
  const handleInputChange60Yard = (e) => {
    e.preventDefault();
    console.log(hidePart2);
    setHide2(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <div className='div-scroll'>
          <div className='row'>
            <Button
              className='btn-save'
              variant='contained'
              color='primary'
              style={{ backgroundImage: 'url(' + saveImage + ')' }}
            ></Button>
            <div className='col s12 center-align'>
              <p>
                <span className='text-purple'>個人運動表現與比賽數據</span>
                <br />
                <span className='text-orange'>若以下資料有不便回答者 可填入N</span>
              </p>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>速度</span>
                  <br />
                  <span>Sprint meansurements (time)</span>
                </p>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>10碼衝刺（秒）</label>
                  <label className='small' htmlFor>
                    10 Yard Split (Sec.)
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_TenYardSplit'
                    type='number'
                    className='validate'
                    name='TenYardSplit'
                    onChange={handleInputChange}
                    value={values.TenYardSplit}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>60碼衝刺（秒）</label>
                  <label className='small' htmlFor>
                    60 Yard Split (Sec.)
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_SixtyYardSplit'
                    type='number'
                    className='validate'
                    name='SixtyYardSplit'
                    onChange={handleInputChange}
                    value={values.SixtyYardSplit}
                  />
                </div>
              </div>
            </div>
            <div className='col s12 center-align'>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>投球表現與生涯數據</span>
                  <br />
                  <span>Pitching Performance &amp; Career Stats</span>
                </p>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>球速（英里每小時）</label>
                  <label className='small' htmlFor>
                    Throwing Velocity (mph)
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_throwing'
                    type='number'
                    className='validate'
                    name='Throwing'
                    onChange={handleInputChange}
                    value={values.Throwing}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>捕手二壘阻殺測試(秒)</label>
                  <label className='small' htmlFor>
                    Block Pitch (sec.)
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_blockpitch'
                    type='number'
                    className='validate'
                    name='BlockPitch'
                    onChange={handleInputChange}
                    value={values.BlockPitch}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>防禦率</label>
                  <label className='small' htmlFor>
                    ERA
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_ERA'
                    type='number'
                    className='validate input-sm'
                    name='ERA'
                    onChange={handleInputChange}
                    value={values.ERA}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>自責分</label>
                  <label className='small' htmlFor>
                    ER
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_ER'
                    type='number'
                    className='validate input-sm'
                    name='ER'
                    onChange={handleInputChange}
                    value={values.ER}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>出賽場數</label>
                  <label className='small' htmlFor>
                    G
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_gamesp'
                    type='number'
                    className='validate input-sm'
                    name='gamesP'
                    onChange={handleInputChange}
                    value={values.gamesP}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>被全壘打</label>
                  <label className='small' htmlFor>
                    BHR
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_bhr'
                    type='number'
                    className='validate input-sm'
                    name='BHR'
                    onChange={handleInputChange}
                    value={values.BHR}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>投球局數</label>
                  <label className='small' htmlFor>
                    IP
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_IP'
                    type='number'
                    className='validate input-sm'
                    name='IP'
                    onChange={handleInputChange}
                    value={values.IP}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>觸身球</label>
                  <label className='small' htmlFor>
                    HB
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_hb'
                    type='number'
                    className='validate input-sm'
                    name='HB'
                    onChange={handleInputChange}
                    value={values.HB}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>被安打</label>
                  <label className='small' htmlFor>
                    H
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_bh'
                    type='number'
                    className='validate input-sm'
                    name='BH'
                    onChange={handleInputChange}
                    value={values.BH}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>保送</label>
                  <label className='small' htmlFor>
                    BB
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_bb'
                    type='number'
                    className='validate input-sm'
                    name='BB'
                    onChange={handleInputChange}
                    value={values.BB}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <label htmlFor>被得分</label>
                <label className='small' htmlFor>
                  R
                </label>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_brun'
                    type='number'
                    className='validate input-sm'
                    name='BRUN'
                    onChange={handleInputChange}
                    value={values.BRUN}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>三振</label>
                  <label className='small' htmlFor>
                    K
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_K'
                    type='number'
                    className='validate input-sm'
                    name='K'
                    onChange={handleInputChange}
                    value={values.K}
                  />
                </div>
              </div>
            </div>
            <div className='col s12 center-align'>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>打擊表現與生涯數據</span>
                  <br />
                  <span>Pitching Performance &amp; Career Stats</span>
                </p>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>揮棒速度（英里每小時）</label>
                  <label className='small' htmlFor>
                    Exit Velocity
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_exit'
                    type='number'
                    className='validate input-sm'
                    name='EXIT'
                    onChange={handleInputChange}
                    value={values.EXIT}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>打席</label>
                  <label className='small' htmlFor>
                    AB
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_ab'
                    type='number'
                    className='validate input-sm'
                    name='AB'
                    onChange={handleInputChange}
                    value={values.AB}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>打擊率</label>
                  <label className='small' htmlFor>
                    AVG
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_avg'
                    type='number'
                    className='validate input-sm'
                    name='AVG'
                    onChange={handleInputChange}
                    value={values.AVG}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>二壘安打</label>
                  <label className='small' htmlFor>
                    2B
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_hit2b'
                    type='number'
                    className='validate input-sm'
                    name='Hit2B'
                    onChange={handleInputChange}
                    value={values.Hit2B}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>攻擊指數</label>
                  <label className='small' htmlFor>
                    OPS
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_ops'
                    type='number'
                    className='validate input-sm'
                    name='OPS'
                    onChange={handleInputChange}
                    value={values.OPS}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>三壘安打</label>
                  <label className='small' htmlFor>
                    3B
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_hit3b'
                    type='number'
                    className='validate input-sm'
                    name='Hit3B'
                    onChange={handleInputChange}
                    value={values.Hit3B}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>出賽場數</label>
                  <label className='small' htmlFor>
                    G
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_gamesH'
                    type='number'
                    className='validate input-sm'
                    name='gamesH'
                    onChange={handleInputChange}
                    value={values.gamesH}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>全壘打</label>
                  <label className='small' htmlFor>
                    HR
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_hr'
                    type='number'
                    className='validate input-sm'
                    name='HR'
                    onChange={handleInputChange}
                    value={values.HR}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>得分</label>
                  <label className='small' htmlFor>
                    R
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_run'
                    type='number'
                    className='validate input-sm'
                    name='RUN'
                    onChange={handleInputChange}
                    value={values.RUN}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>被三振</label>
                  <label className='small' htmlFor>
                    K
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_bk'
                    type='number'
                    className='validate input-sm'
                    name='BK'
                    onChange={handleInputChange}
                    value={values.BK}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>安打</label>
                  <label className='small' htmlFor>
                    H
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_hits'
                    type='number'
                    className='validate input-sm'
                    name='Hits'
                    onChange={handleInputChange}
                    value={values.Hits}
                  />
                </div>
              </div>
              <div className='col s2 right-align'>
                <div className='mb-3'>
                  <label htmlFor>被保送</label>
                  <label className='small' htmlFor>
                    BB
                  </label>
                </div>
              </div>
              <div className='col s2'>
                <div className='mb-3'>
                  <input
                    id='user_bbb'
                    type='number'
                    className='validate input-sm'
                    name='BBB'
                    onChange={handleInputChange}
                    value={values.BBB}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>最近一次比賽名稱</label>
                  <label className='small' htmlFor>
                    Most recent game tournament/competition name
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id='user_gamename'
                    type='text'
                    className='validate'
                    name='latestGameName'
                    onChange={handleInputChange}
                    value={values.latestGameName}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>最近一次比賽日期</label>
                  <label className='small' htmlFor>
                    Most recent game date
                  </label>
                </div>
              </div>
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
                yearDropdownItemNumber={30}
                scrollableYearDropdown
              />
              <div className='col s8'>
                <div className='mb-3'>
                  <DatePicker
                    name='birthday'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearDropdown
                    dateFormatCalendar='MMMM'
                    yearDropdownItemNumber={30}
                    scrollableYearDropdown
                  />
                </div>
              </div>
            </div>
            <div className='col s12 center-align'>
              <div>
                <p className='text-purple'>
                  <span>最近一場比賽成績</span>
                  <br />
                  <span>Most recent game statistics</span>
                </p>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s6'>
                <div className='d-inline-block boder-orange'>
                  <p className='center-align text-orange'>
                    <span>投球成績</span>
                    <br />
                    <span>Pitching Performance</span>
                  </p>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>防禦率</label>
                        <label className='small' htmlFor>
                          ERA
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lERA'
                          type='number'
                          className='validate input-xs'
                          name='lERA'
                          onChange={handleInputChange}
                          value={values.lERA}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>自責分</label>
                        <label className='small' htmlFor>
                          ER
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lER'
                          type='number'
                          className='validate input-xs'
                          name='lER'
                          onChange={handleInputChange}
                          value={values.lER}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>投球局數</label>
                        <label className='small' htmlFor>
                          IP
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        {' '}
                        <input
                          id='user_lIP'
                          type='number'
                          className='validate input-xs'
                          name='lIP'
                          onChange={handleInputChange}
                          value={values.lIP}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>被全壘打</label>
                        <label className='small' htmlFor>
                          HR
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lBHR'
                          type='number'
                          className='validate input-xs'
                          name='lBHR'
                          onChange={handleInputChange}
                          value={values.lBHR}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>被安打</label>
                        <label className='small' htmlFor>
                          H
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lBH'
                          type='number'
                          className='validate input-xs'
                          name='lBH'
                          onChange={handleInputChange}
                          value={values.lBH}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>觸身球</label>
                        <label className='small' htmlFor>
                          HB
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lHB'
                          type='number'
                          className='validate input-xs'
                          name='lHB'
                          onChange={handleInputChange}
                          value={values.lHB}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>被得分</label>
                        <label className='small' htmlFor>
                          R
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lBRUN'
                          type='number'
                          className='validate input-xs'
                          name='lBRUN'
                          onChange={handleInputChange}
                          value={values.lBRUN}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>保送</label>
                        <label className='small' htmlFor>
                          BB
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <div className='mb-3'>
                          <input
                            id='user_lBB'
                            type='number'
                            className='validate input-xs'
                            name='lBB'
                            onChange={handleInputChange}
                            value={values.lBB}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 offset-s6 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>三振</label>
                        <label className='small' htmlFor>
                          K
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lK'
                          type='number'
                          className='validate input-xs'
                          name='lK'
                          onChange={handleInputChange}
                          value={values.lK}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col s6'>
                <div className='d-inline-block boder-orange'>
                  <p className='center-align text-orange'>
                    <span>打擊成績</span>
                    <br />
                    <span>Pitching Performance</span>
                  </p>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>打擊率</label>
                        <label className='small' htmlFor>
                          AVG
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lAVG'
                          type='number'
                          className='validate input-xs'
                          name='lAVG'
                          onChange={handleInputChange}
                          value={values.lAVG}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>二壘安打</label>
                        <label className='small' htmlFor>
                          2B
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lhit2b'
                          type='number'
                          className='validate input-xs'
                          name='lHit2B'
                          onChange={handleInputChange}
                          value={values.lHit2B}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>攻擊指數</label>
                        <label className='small' htmlFor>
                          OPS
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lOPS'
                          type='number'
                          className='validate input-xs'
                          name='lOPS'
                          onChange={handleInputChange}
                          value={values.lOPS}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>三壘安打</label>
                        <label className='small' htmlFor>
                          3B
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lhit3b'
                          type='number'
                          className='validate input-xs'
                          name='lHit3B'
                          onChange={handleInputChange}
                          value={values.lHit3B}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>得分</label>
                        <label className='small' htmlFor>
                          R
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lrun'
                          type='number'
                          className='validate input-xs'
                          name='lRUN'
                          onChange={handleInputChange}
                          value={values.lRUN}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>全壘打</label>
                        <label className='small' htmlFor>
                          HR
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='col s3'>
                    <div className='mb-3'>
                      <input
                        id='user_lHR'
                        type='number'
                        className='validate input-xs'
                        name='lHitHR'
                        onChange={handleInputChange}
                        value={values.lHitHR}
                      />
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>安打</label>
                        <label className='small' htmlFor>
                          H
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lhits'
                          type='number'
                          className='validate input-xs'
                          name='lHits'
                          onChange={handleInputChange}
                          value={values.lHits}
                        />
                      </div>
                    </div>
                    <div className='col s3 right-align'>
                      <div className='mb-3'>
                        <label htmlFor>被三振</label>
                        <label className='small' htmlFor>
                          K
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lBK'
                          type='number'
                          className='validate input-xs'
                          name='lBK'
                          onChange={handleInputChange}
                          value={values.lBK}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col s12'>
                    <div className='col s3 offset-s6  right-align'>
                      <div className='mb-3'>
                        <label htmlFor>被保送</label>
                        <label className='small' htmlFor>
                          BB
                        </label>
                      </div>
                    </div>
                    <div className='col s3'>
                      <div className='mb-3'>
                        <input
                          id='user_lBBB'
                          type='number'
                          className='validate input-xs'
                          name='lBBB'
                          onChange={handleInputChange}
                          value={values.lBBB}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant='contained' color='primary' onClick={handleClick}>
                儲存資料
              </Button>
            </div>
          </div>
        </div>
      </Grid>{' '}
    </Form>
  );
}
