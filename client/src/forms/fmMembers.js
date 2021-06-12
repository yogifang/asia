import React, { useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Context } from '../components/stores';
import { useForm, Form } from '../components/useForm';
import axios from '../components/axios';
import Select from 'react-select';
import { customStyles } from './customStyles.js';

const initialFValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  passport: false,
  sportItem: '',
  isPrivacy: '',
  filled: false,
};

const optionsSportItem = [
  { value: 'baseball', label: '棒球' },
  { value: 'shooting', label: '射擊' },
];

export default function MemberForm() {
  const [showP1, setShowP1] = useState(false);
  const { showTabs, setShowTabs } = useContext(Context);
  const { showBaseball, setShowBaseball } = useContext(Context);
  const { recMember, setRecMember } = useContext(Context);
  // setRecMember(initialFValues);
  // setRecMember('initialFValues.email');
  // console.log('q-------------' + recMember.email);

  const getExistEmail = async (emailAddr = values.email) => {
    try {
      console.log(emailAddr.email);
      const Data = await axios.get(`/asia-scouting/members/?email=${emailAddr}`);
      console.log('got data back......');
      // console.log(Data.data);
      // values.email = Data.data.email;
      // values.password = Data.data.password;
      // console.log(values);
      if (Data.data === null) {
        console.log('waite data back......');
        await axios.post('/asia-scouting/members/', values);

        setRecMember(values);
        setShowTabs(true);
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

    console.log('........tt..........' + fieldValues.sportItem);
    console.log(customStyles);
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

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(recMember, true, validate);

  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
    console.log(values);
    console.log('errors...' + errors);
    if (
      (values.email === '') |
      (values.password === '') |
      (values.passport === '') |
      (values.isPrivacy === '') |
      (values.sportItem === '')
    ) {
      alert('資料必需完整！');
      return;
    } else {
      if (errors !== null) {
        if ((errors.email !== '') & ((errors.password !== '') & (errors.passwordConfirm !== ''))) {
          alert('資料必需正確！');
          return;
        }
      }
    }
    getExistEmail(values.email);
  };

  const handleClickBackdoor = (e) => {
    setShowTabs(true);
    alert('Back Door is Open');
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(values.password);
      console.log(values.passwordConfirm);
      if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = '密碼輸入不相同！';
      } else {
        errors.passwordConfirm = '';
      }
    }
  };

  const handleSportChange = (event) => {
    console.log('sport-------' + event.value);
    values.sportItem = event.value;
    if (event.value === 'baseball') {
      setShowBaseball(true);
    } else {
      setShowBaseball(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <div className='div-scroll'>
          <div className='row'>
            <div className='col s12'>
              <div className='col s6'>
                <div className='mb-3'>
                  <div className='input-title'>
                    <p> * 您是否持有歐盟護照或居住在歐洲 </p>{' '}
                    <span>* Are you an EU citizen or holding an EU citizenship ?</span>{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
              <div className='col s4'>
                <div className='d-flex'>
                  <div className='ml-2 mb-3'>
                    <label>
                      <input
                        name='passport'
                        type='radio'
                        onChange={handleInputChange}
                        onClick={() => setShowP1(false)}
                        value={values.passport}
                      />
                      <span> 是 </span> <span> YES </span>{' '}
                    </label>{' '}
                  </div>{' '}
                  <div className='ml-2 mb-3'>
                    <label>
                      <input
                        name='passport'
                        type='radio'
                        onChange={handleInputChange}
                        onClick={() => setShowP1(true)}
                        value={values.passport}
                      />
                      <span> 否 </span> <span> NO </span>{' '}
                    </label>{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
            {showP1 ? (
              <div>
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
                  <div className='col s5'>
                    <input
                      id='user_password'
                      type='password'
                      className='validate'
                      name='password'
                      value={values.password}
                      onChange={handleInputChange}
                    />{' '}
                    <label className='left-align small'> {errors.password} </label>{' '}
                  </div>{' '}
                </div>{' '}
                <div className='col s12'>
                  <div className='col s5'>
                    <div className='mb-3'>
                      <label className='right-align' htmlFor=''>
                        確認密碼{' '}
                      </label>{' '}
                      <label className='right-align small' htmlFor=''>
                        Create a password{' '}
                      </label>{' '}
                    </div>{' '}
                  </div>{' '}
                  <div className='col s5'>
                    <input
                      id=''
                      type='password'
                      className='validate'
                      name='passwordConfirm'
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      value={values.passwordConfirm}
                    />{' '}
                    <label className='left-align small'> {errors.passwordConfirm} </label>{' '}
                  </div>{' '}
                </div>
                <div className='col s12'>
                  <div className='col s5'>
                    <div className='mb-3'>
                      <label className='right-align' htmlFor=''>
                        *運動項目
                      </label>
                      <label className='right-align small' htmlFor=''>
                        *Sport items
                      </label>
                    </div>
                  </div>{' '}
                  <div className='col s7'>
                    <div className='mb-3'>
                      <Select
                        className='browser-default col s7 mb-2'
                        name='sportItem'
                        value={values.sportItem.value}
                        autosize={true}
                        onChange={handleSportChange}
                        options={optionsSportItem}
                        styles={customStyles}
                      />
                    </div>
                  </div>{' '}
                </div>{' '}
                <div className='col s12 center-align'>
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
                  </Button>{' '}
                  <br></br>
                  <br></br>
                  <Button variant='contained' color='primary' onClick={handleClickBackdoor}>
                    Back Door
                  </Button>
                </div>{' '}
              </div>
            ) : null}
          </div>{' '}
        </div>{' '}
      </Grid>{' '}
    </Form>
  );
}
