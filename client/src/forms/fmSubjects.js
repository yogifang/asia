import React, { useContext, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import axios from '../components/axios';
import Context from '../components/stores';
import { useForm, Form } from '../components/useForm';

import Status from './status';

const initialFValues = {
  _id: '',
  member: '',
  GPA: 0,
  AVG: 0,
  TOFEL: 0,
  IELTS: 0,
  TOEIC: 0,
  SAT: 0,
  ACT: 0,
  IntentMajor: '',
  bFilled: false,
};

export default function BasicInfoForm() {
  const { recMember, setMember } = useContext(Context);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

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
      recMember.email = 'yogifang@gmail.com';
      const Data = await axios.get(`/asia-scouting/subjects/?member=${recMember.email}`);
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

      console.log(nValues);
      console.log(values);
    }
    fetchData();
    //values.member = recMember.email ;
  }, []);

  const handleClick = async (e) => {
    console.log(values);
    console.log(recMember.email);
    values.member = recMember.email;
    if (values.id === '') {
      await axios.post('/asia-scouting/subjects/', values);
    } else {
      await axios.put('/asia-scouting/subjects/', values);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <div className='row'>
          <div className='col s12'>
            <div className='col s12 text-orange center-align'>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>學業成績</span>
                  <br />
                  <span>Academic Performance</span>
                </p>
              </div>
            </div>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>在校成績GPA</label>
                <label className='small' htmlFor>
                  GPA
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='GPA'
                  onChange={handleInputChange}
                  value={values.GPA}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>在校平均成績</label>
                <label className='small' htmlFor />
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='AVG'
                  onChange={handleInputChange}
                  value={values.AVG}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s12 text-orange center-align'>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>英文檢定</span>
                  <br />
                  <span>Language Proficiency Tests</span>
                </p>
              </div>
            </div>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>托福考試成績</label>
                <label className='small' htmlFor>
                  TOEFL iBT Scores
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='TOFEL'
                  onChange={handleInputChange}
                  value={values.TOFEL}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>雅思考試成績</label>
                <label className='small' htmlFor>
                  IELTS Scores
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='IELTS'
                  onChange={handleInputChange}
                  value={values.IELTS}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>多益考試成績</label>
                <label className='small' htmlFor>
                  TOEIC Scores
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='TOEIC'
                  onChange={handleInputChange}
                  value={values.TOEIC}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s12 text-orange center-align'>
              <div className='bg-orange d-inline-block mb-3 p-1'>
                <p className='m-0'>
                  <span>美國大學入學檢定</span>
                  <br />
                  <span>College Entrance Exam</span>
                </p>
              </div>
            </div>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>SAT考試成績</label>
                <label className='small' htmlFor>
                  SAT Scores
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='SAT'
                  onChange={handleInputChange}
                  value={values.SAT}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>ACT考試成績</label>
                <label className='small' htmlFor>
                  ACT Scores
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id='user_height'
                  type='number'
                  className='validate'
                  name='ACT'
                  onChange={handleInputChange}
                  value={values.ACT}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <div className='col s4 right-align'>
              <div className='mb-3'>
                <label htmlFor>欲就讀科系</label>
                <label className='small' htmlFor>
                  Interests in College Major
                </label>
              </div>
            </div>
            <div className='col s8'>
              <div className='mb-3'>
                <input
                  id=' '
                  type='text'
                  className='validate'
                  name='IntentMajor'
                  onChange={handleInputChange}
                  value={values.IntentMajor}
                />
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
