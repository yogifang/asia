import React, { useState, useContext, useEffect } from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { Context } from '../components/stores';
import { useForm, Form } from '../components/useForm';
import axios from '../components/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import customStyles from './customStyles';

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
  { value: 'LPLH', label: '左投左打' },
  { value: 'RPRH', label: '右投右打' },
  { value: 'LPRH', label: '左投右打' },
  { value: 'RPLH', label: '右投左打' },
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
  _id: '',
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
  const [radioGenger, setRadioGender] = useState('Male');
  const [selPriPosition, setSelPriPosition] = useState(optionsPosition[0]);
  const [selSecPosition, setSelSecPosition] = useState(optionsPosition[1]);
  const [selHands, setSelHands] = useState(optionsHands[0]);
  const [selGrads, setSelGrads] = useState(optionsGrads[0]);
  const [dateGrad, setDateGrad] = useState(new Date());
  const { memberEmail, setMemberEmail } = useContext(Context);
  const { showBaseball, setShowBaseball } = useContext(Context);

  const findIndexByValue = (options, value) => {
    const index = options.findIndex((options) => options.value === value);
    return index;
    //console.log(options[4].label);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('ChineseName' in fieldValues) temp.ChineseName = fieldValues.ChineseName ? '' : '此欄位不得空白。';
    if ('PassportName' in fieldValues) temp.PassportName = fieldValues.PassportName ? '' : '此欄位不得空白。';

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  useEffect(() => {
    async function fetchData() {
      //recMember.email = 'yogifang@gmail.com';
      console.log('getdata..................');
      console.log(memberEmail);
      const Data = await axios.get(`/asia-scouting/baseballinfos/?member=${memberEmail}`);

      console.log(Data.data);
      if (Data.data === null) return;

      let field;
      let nValues = {};
      for (field in values) {
        //  console.log(field);
        console.log(Data.data[field]);
        nValues[field] = Data.data[field];
        // setValues(field, Data.data[field]);
      }
      console.log(nValues);
      setValues(nValues);
      let index = findIndexByValue(optionsPosition, nValues.PriPosition);
      setSelPriPosition(optionsPosition[index]);
      index = findIndexByValue(optionsPosition, nValues.SecPosition);
      setSelSecPosition(optionsPosition[index]);
      index = findIndexByValue(optionsHands, nValues.LeftRightHand);
      setSelHands(optionsHands[index]);
      index = findIndexByValue(optionsGrads, nValues.currentGrad);
      setSelGrads(optionsGrads[index]);
      setRadioGender(nValues.Gender);
      setDateGrad(new Date(nValues.GradDate));

      console.log(nValues);
      console.log(values);
    }
    fetchData();
    //values.member = recMember.email ;
  }, []);

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

  const handelSelectPriPosition = (e) => {
    setSelPriPosition(e);
    values.PriPosition = e.value;
  };

  const handelSelectSecPosition = (e) => {
    setSelSecPosition(e);
    values.SecPosition = e.value;
  };

  const handelSelectLRHand = (e) => {
    setSelHands(e);
    values.LeftRightHand = e.value;
  };
  const handelSelectCurrentGrad = (e) => {
    setSelGrads(e);
    values.currentGrad = e.value;
  };

  const handleRadioGender = (e) => {
    setRadioGender(e.target.value);
    values.Gender = e.target.value;
  };

  const handleSetDate = (e) => {
    console.log(e);
    values.GradDate = e;
    setDateGrad(e);
  };

  const handleClick = async (e) => {
    values.member = memberEmail;
    console.log(values);

    if (values._id === '') {
      await axios.post('/asia-scouting/baseballinfos/', values);
    } else {
      await axios.put('/asia-scouting/baseballinfos/', values);
    }
    alert('Data is Saved!!');
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
                  <label className='right-align' for='user_name_zh'>
                    *中文姓名
                  </label>
                  <label className='right-align small' for='user_name_zh'>
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
                  <label className='left-align small'> {errors.ChineseName} </label>{' '}
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
                  <label className='left-align small'> {errors.PassportName} </label>
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
                      <input
                        name='Gender'
                        type='radio'
                        checked={radioGenger === 'Male'}
                        onChange={handleRadioGender}
                        value='Male'
                      />
                      <span>男</span>
                      <span>Male</span>
                    </label>
                  </div>
                  <div className='ml-2'>
                    <label>
                      <input
                        name='Gender'
                        type='radio'
                        checked={radioGenger === 'Female'}
                        onChange={handleRadioGender}
                        value='Female'
                      />
                      <span>女</span>
                      <span>Female</span>
                    </label>
                  </div>
                  <div className='ml-2'>
                    <label>
                      <input
                        name='Gender'
                        type='radio'
                        checked={radioGenger === 'Others'}
                        onChange={handleRadioGender}
                        value='Others'
                      />
                      <span>其他</span>
                      <span>Other</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {showBaseball ? (
              <div>
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
                        value={selPriPosition}
                        options={optionsPosition}
                        onChange={handelSelectPriPosition}
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
                        value={selSecPosition}
                        onChange={handelSelectSecPosition}
                        options={optionsPosition}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

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
                    value={selHands}
                    onChange={handelSelectLRHand}
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
                    value={selGrads}
                    onChange={handelSelectCurrentGrad}
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
                    selected={dateGrad}
                    onChange={handleSetDate}
                    dateFormat='MM/yyyy'
                    showMonthYearPicker
                  />
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
