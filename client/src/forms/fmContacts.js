import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import Context from '../components/stores';
import axios from '../components/axios';
import { useForm, Form } from '../components/useForm';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import countryList from '../components/controls/country-list';
import customStyles from './customStyles';

const initialFValues = {
  _id: '',
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
  const [birthday, setBirthday] = useState(new Date());
  const listOption = new countryList();
  const optionsCountry = useMemo(() => listOption.getData(), []);
  const [country, setCountry] = useState(optionsCountry[0]);
  const { memberEmail, setMemberEmail } = useContext(Context);

  const selCountryChangeHandler = (country) => {
    console.log(country);
    console.log(optionsCountry[30]);
    setCountry(country);
    values.Nationality = country.label;
  };

  const findIndexByValue = (options, label) => {
    let index = options.findIndex((options) => options.label === label);
    console.log(index);
    if (index === -1) index = 0;
    return index;
    //console.log(options[4].label);
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

  useEffect(() => {
    async function fetchData() {
      // recMember.email = 'yogifang@gmail.com';
      const Data = await axios.get(`/asia-scouting/contacts/?member=${memberEmail}`);
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
      const index = findIndexByValue(optionsCountry, nValues.Nationality);
      console.log(index);

      setCountry(optionsCountry[index]);
      setBirthday(new Date(nValues.birthday));
      console.log(nValues);
      console.log(values);
    }
    fetchData();
    //values.member = recMember.email ;
  }, []);
  const handleClick = async (e) => {
    console.log(values);
    console.log(memberEmail);
    values.member = memberEmail;
    console.log(values);
    if (values._id === '') {
      await axios.post('/asia-scouting/contacts/', values);
    } else {
      await axios.put('/asia-scouting/contacts/', values);
    }
    alert('Data is Saved!!');
  };
  const handleBirthdayChange = (e) => {
    values.birthday = e;
    setBirthday(e);
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
                  id=' '
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
                  selected={birthday}
                  onChange={handleBirthdayChange}
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
                <input
                  id=' '
                  type='text'
                  className='validate'
                  name='school'
                  onChange={handleInputChange}
                  value={values.school}
                />
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
                <input
                  id=' '
                  type='text'
                  className='validate'
                  name='liveCity'
                  onChange={handleInputChange}
                  value={values.liveCity}
                />
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
                  name='Nationality'
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
                <input
                  id='user_link'
                  type='text'
                  name='links'
                  className='validate'
                  placeholder='請貼連結'
                  value={values.links}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='col s12'>
            <p className='center-align text-purple'>
              *如有影片或其他檔案皆可email 至 service@findyourathlete.com
              <br />
              並註明您的姓名及生日，謝謝！
              <br />
              <Button variant='contained' color='primary' onClick={handleClick}>
                儲存資料
              </Button>
            </p>
          </div>
        </div>
      </Grid>{' '}
    </Form>
  );
}
