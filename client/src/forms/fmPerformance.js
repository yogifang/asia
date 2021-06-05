import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Part2 from './fmPerformanceP2';
import Part3 from './fmPerformanceP3';
import Part4 from './fmPerformanceP4';
import MyView from './myview';

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

export default function BaseballPerformance() {
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

  const handleInputChange60Yard = (e) => {
    e.preventDefault();
    console.log(hidePart2);
    setHide2(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <div>
          <div className='row div-scroll'>
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
          </div>
        </div>

        <Part2 />

        <Part3 />
        <Part4 />
      </Grid>{' '}
    </Form>
  );
}
