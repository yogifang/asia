import React, { Component, useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const initialFValues = {
  email: '',
  birthday: new Date(),
  school: '',
  liveCity: '',
  Nationality: '',
  links: '',
  member: '',
  bFilled: false,
};

export default function BasicInfoForm() {
  const [startDate, setStartDate] = useState(new Date());

  const [country, setValue] = useState('');

  const optionsCountry = useMemo(() => countryList().getData(), []);

  const selCountryChangeHandler = (country) => {
    setValue(country);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';

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
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '6px',
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
        <Grid item xs={1}>
          <Status />
        </Grid>{' '}
        <Grid item xs={10}>
          <div className='row'>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor>電子郵件</label>
                  <label className='small' htmlFor>
                    Contact Email
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input
                    id
                    type='text'
                    className='validate'
                    name='email'
                    onChange={handleInputChange}
                    value={values.email}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor='user_birth'>出生年月日</label>
                  <label className='small' htmlFor='user_birth'>
                    Birthdate
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
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor='user_school'>就讀學校</label>
                  <label className='small' htmlFor='user_school'>
                    School
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input id type='text' className='validate' />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor='user_city'>居住城市</label>
                  <label className='small' htmlFor='user_city'>
                    What city do you live in?
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input id type='text' className='validate' />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor='user_nationality'>*國籍</label>
                  <label className='small' htmlFor='user_nationality'>
                    *Nationality
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <Select
                    className='browser-default col s6 mb-2'
                    options={optionsCountry}
                    value={country}
                    onChange={selCountryChangeHandler}
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <div className='col s4 right-align'>
                <div className='mb-3'>
                  <label htmlFor='user_link'>其他資料或個人社群連結</label>
                  <label className='small' htmlFor='user_link'>
                    Other showcasing links
                  </label>
                </div>
              </div>
              <div className='col s8'>
                <div className='mb-3'>
                  <input id='user_link' type='text' className='validate' placeholder='請貼連結' />
                </div>
              </div>
            </div>
            <div className='col s12'>
              <p className='center-align text-purple'>
                *如有影片或其他檔案皆可email 至 service@findyourathlete.com
                <br />
                並註明您的姓名及生日，謝謝！
              </p>
            </div>
          </div>
        </Grid>{' '}
      </Grid>{' '}
    </Form>
  );
}
