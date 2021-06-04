import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const initialFValues = {
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

export default function BaseballPerformanceP3() {
  const [startDate, setStartDate] = useState(new Date());

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

  return (
    <div>
      <div className='row'>
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
      </div>
    </div>
  );
}
