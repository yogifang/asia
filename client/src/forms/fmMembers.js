import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';
import axios from '../components/axios';

const initialFValues = {
  email: '',
  password: '',
  passport: '',
  isPrivacy: '',
  filled: false,
};

export default function MemberForm() {
  const getMembers = async () => {
    try {
      //取得數據庫http://localhost:3003/posts的數據
      console.log('got get database......');
      const Data = await axios.get('/asia-scouting/members/');
      console.log(Data.data);
    } catch (error) {
      alert('GET Error!!');
    }
  };

  const getExistEmail = async (emailAddr = values.email) => {
    try {
      console.log(emailAddr.email);
      const Data = await axios.get(`/asia-scouting/members/?email=${emailAddr}`);
      console.log('got data back......');
      console.log(Data.data);
      if (Data.data === null) {
        console.log('waite data back......');
        await axios.post('/asia-scouting/members/', values);
        alert('帳號建立完成！！');
      } else {
        alert('帳號已存在！！');
      }
    } catch (error) {
      if (error.Status === 404) alert('GET Error!!' + error);
    }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('email' in fieldValues) {
      if (temp.email !== '') temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email 格式錯誤.';
    }

    if ('password' in fieldValues) temp.password = fieldValues.password.length > 5 ? '' : '不得少於5個字元。';

    if ('isPrivacy' in fieldValues) {
      console.log('got isPrivacy....003..');
      console.log(fieldValues);
      if (fieldValues.isPrivacy === true) {
      }
    }

    console.log(temp);
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

  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
    console.log(values);
    console.log(errors);
    if ((values.email === '') | (values.password === '') | (values.passport === '') | (values.isPrivacy === '')) {
      alert('資料必需完整！');
      return;
    } else {
      if ((errors !== null) & (errors.email !== '') & (errors.password !== '')) {
        alert('資料必需正確！');
        return;
      }
    }
    console.log('11111111....' + values.email);
    getExistEmail(values.email);
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
        <Grid item xs={1}>
          <Status />
        </Grid>{' '}
        <Grid item xs={1}>
          {' '}
        </Grid>{' '}
        <Grid item xs={8}>
          <div className='div-scroll'>
            <div className='row'>
              <div className='col s12'>
                <div className='col s5'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_email'>
                      請輸入您的聯絡信箱{' '}
                    </label>{' '}
                    <label className='right-align small' htmlFor='user_email'>
                      Enter your email{' '}
                    </label>{' '}
                  </div>{' '}
                </div>{' '}
                <div className='col s7'>
                  <div className='mb-3'>
                    <input
                      id='user_email'
                      type='text'
                      className='validate'
                      name='email'
                      value={values.email}
                      onChange={handleInputChange}
                    />{' '}
                    <label className='left-align small'> {errors.email} </label>{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
              <div className='col s12'>
                <div className='col s5'>
                  <div className='mb-3'>
                    <label className='right-align' htmlFor='user_password'>
                      建立密碼{' '}
                    </label>{' '}
                    <label className='right-align small' htmlFor='user_password'>
                      Create a password{' '}
                    </label>{' '}
                  </div>{' '}
                </div>{' '}
                <div className='col s7'>
                  <input
                    id='user_password'
                    type='text'
                    className='validate'
                    name='password'
                    value={values.password}
                    onChange={handleInputChange}
                  />{' '}
                  <label className='left-align small'> {errors.password} </label>{' '}
                </div>{' '}
              </div>{' '}
              <div className='col s12'>
                <div className='col s6'>
                  <div className='input-title'>
                    <p> * 您是否持有歐盟護照或居住在歐洲 </p>{' '}
                    <span>* Are you an EU citizen or holding an EU citizenship ?</span>{' '}
                  </div>{' '}
                </div>{' '}
                <div className='col s4'>
                  <div className='d-flex'>
                    <div className='ml-2'>
                      <label>
                        <input name='passport' type='radio' onChange={handleInputChange} value='true' />
                        <span> 是 </span> <span> YES </span>{' '}
                      </label>{' '}
                    </div>{' '}
                    <div className='ml-2'>
                      <label>
                        <input name='passport' type='radio' onChange={handleInputChange} value='false' />
                        <span> 否 </span> <span> NO </span>{' '}
                      </label>{' '}
                    </div>{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
              <div className='col s12 center-align mt-100'>
                <p className='text-purple m-0'>* 本人已閱讀並同意願遵守使用者條款及隱私權政策 </p>{' '}
                <span className='text-purple'>
                  * By clicking Check box, you agree to our Terms and our Privacy Policy.{' '}
                </span>{' '}
                <label>
                  <input name='isPrivacy' type='checkbox' onChange={handleInputChange} checked={values.isPrivacy} />{' '}
                  <span> 是 </span> <span> YES </span>{' '}
                </label>{' '}
                <br></br>
                <Button variant='contained' color='primary' onClick={handleClick}>
                  建立帳號
                </Button>
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </Grid>{' '}
      </Grid>{' '}
    </Form>
  );
}
