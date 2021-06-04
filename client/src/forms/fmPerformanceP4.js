import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';

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

export default function BaseballPerformanceP4() {
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
                <div className='col s3'>
                  <div className='mb-3'>
                    <input
                      id='user_lHR'
                      type='number'
                      className='validate input-xs'
                      name='lHR'
                      onChange={handleInputChange}
                      value={values.lHR}
                    />
                  </div>
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
        </div>
      </div>
    </div>
  );
}
