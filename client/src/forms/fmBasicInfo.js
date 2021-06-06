import { Grid, Box } from '@material-ui/core';

import { useForm, Form } from '../components/useForm';
import * as asiaService from '../services/asiaService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Component, useState } from 'react';
import Select from 'react-select';

const optionsPosition = [
  { value: 'P', label: '投手' },
  { value: 'C', label: '捕手' },
  { value: '1B', label: '一壘手' },
  { value: '2B', label: '二壘手' },
  { value: '3B', label: '三壘手' },
  { value: 'SS', label: '游擊手' },
  { value: 'LF', label: '左外野手' },
  { value: 'CF', label: '中外野手' },
  { value: 'RF', label: '右外野手' },
  { value: 'DH', label: '指定打擊' },
];

const optionsHands = [
  { value: 'L', label: '左投左打' },
  { value: 'R', label: '右投右打' },
  { value: 'LR', label: '左投右打' },
  { value: 'RL', label: '右投左打' },
];

const optionsGrads = [
  { value: 'G1', label: '小學一年級' },
  { value: 'G2', label: '小學二年級' },
  { value: 'G3', label: '小學三年級' },
  { value: 'G4', label: '小學四年級' },
  { value: 'G5', label: '小學五年級' },
  { value: 'G6', label: '小學六年級' },
  { value: 'G7', label: '國中一年級' },
  { value: 'G8', label: '國中二年級' },
  { value: 'G9', label: '國中三年級' },
  { value: 'G10', label: '高中一年級' },
  { value: 'G11', label: '高中二年級' },
  { value: 'G12', label: '高中三年級' },
  { value: 'G13', label: '大學' },
];

const initialFValues = {
  ChineseName: '',
  PassportName: '',
  Gender: '',
  GradDate: Date.now(),
  Height: 0.0,
  LeftRightHand: '',
  PriPosition: '',
  SecPosition: '',
  Weight: 0.0,
  bFilled: false,
  currentGrad: '',
  member: '',
};

export default function BasicInfoForm() {
  const [startDate, setStartDate] = useState(new Date());

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : '此欄位不得空白。';
    if ('englishName' in fieldValues) temp.englishName = fieldValues.englishName ? '' : '此欄位不得空白。';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email 格式錯誤.';
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
      <Box pl={100} />
      <Grid container>
          <div className='div-scroll'>
            <div className='row'>
              <div className='col s12'>
                <p className='center-align text-orange'>若以下資料有不便回答者 可填入N</p>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_name_zh'>
                      *中文姓名
                    </label>
                    <label className='right-align small' htmlFor='user_name_zh'>
                      *Preferred Name
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_name_zh'
                      type='text'
                      className='validate'
                      name='ChineseName'
                      value={values.ChineseName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_name'>
                      *護照英文名
                    </label>
                    <label className='right-align small' htmlFor='user_name'>
                      *First Name and Last Name
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_name'
                      type='text'
                      className='validate'
                      name='PassportName'
                      value={values.PassportName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='input-title mb-3'>
                    <p>*性別</p>
                    <span>*Sex</span>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='d-flex mb-3'>
                    <div className='ml-2'>
                      <label>
                        <input name='Gender' type='radio' onChange={handleInputChange} value='Male' />
                        <span>男</span>
                        <span>Male</span>
                      </label>
                    </div>
                    <div className='ml-2'>
                      <label>
                        <input name='Gender' type='radio' onChange={handleInputChange} value='Female' />
                        <span>女</span>
                        <span>Female</span>
                      </label>
                    </div>
                    <div className='ml-2'>
                      <label>
                        <input name='Gender' type='radio' onChange={handleInputChange} value='Others' />
                        <span>其他</span>
                        <span>Other</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_position'>
                      *守備位置
                    </label>
                    <label className='right-align small' htmlFor='user_position'>
                      *Position
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      placeholder='Select Position'
                      className='browser-default col s5 mb-2'
                      name='PriPosition'
                      autosize={true}
                      id='user_position'
                      options={optionsPosition}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_second_position'>
                      *第二守備位置
                    </label>
                    <label className='right-align small' htmlFor='user_second_position'>
                      *Second Position(s)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      placeholder='Select Position'
                      className='browser-default col s5 mb-2'
                      name='SecPosition'
                      autosize={true}
                      id='user_position'
                      options={optionsPosition}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_height'>
                      身高（公分）
                    </label>
                    <label className='right-align small' htmlFor='user_height'>
                      Height (cm)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_height'
                      type='number'
                      className='validate'
                      name='Height'
                      onChange={handleInputChange}
                      value={values.Height}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_weight'>
                      體重（公斤）
                    </label>
                    <label className='right-align small' htmlFor='user_weight'>
                      Weight (kg)
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <input
                      id='user_weight'
                      type='number'
                      className='validate'
                      name='Weight'
                      onChange={handleInputChange}
                      value={values.Weight}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor>
                      投/打慣用手
                    </label>
                    <label className='right-align small' htmlFor>
                      B/T
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      placeholder='Select Hands'
                      className='browser-default col s5 mb-2'
                      name='LeftRightHand'
                      autosize={true}
                      id='user_position'
                      options={optionsHands}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_grad'>
                      年級
                    </label>
                    <label className='right-align small' htmlFor='user_grad'>
                      School Grad Year
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <Select
                      placeholder='Select Grad'
                      className='browser-default col s5 mb-2'
                      name='currentGrad'
                      autosize={true}
                      id='user_position'
                      options={optionsGrads}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>

              <div className='col s12'>
                <div className='col s4'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_graduation'>
                      高中預計畢業日期（年月）
                    </label>
                    <label className='right-align small' htmlFor='user_graduation'>
                      High School Expected Graduation Date
                    </label>
                  </div>
                </div>
                <div className='col s8'>
                  <div className='mb-3'>
                    <DatePicker
                      name='GradData'
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat='MM/yyyy'
                      showMonthYearPicker
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Grid>{' '}
    </Form>
  );
}
