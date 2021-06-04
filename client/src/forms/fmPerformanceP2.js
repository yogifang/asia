import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';
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

export default function BaseballPerformanceP2() {
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
      </div>
    </div>
  );
}
