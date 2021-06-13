import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import Status from './status';

const confirmItems = [
  { id: 'yap', title: '確定' },
  { id: 'nope', title: '不確定' },
];

const initialFValues = {
  id: 0,
  confirm: 'nope',


};

export default function BasicInfoForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container >
        <div className='div-scroll'>
          <div className="row">
            <div className="col s12 center-align">
              <p className="text-purple">
                本人確定以上所有資訊皆據實填寫<br />
                I hereby declare that the above information is true and accurate to the best of my knowledge.
              </p>
              <label>
                <input name="group1" type="radio" />
                <span>確定</span>
                <span>YES</span>
              </label>
              <div style={{ 'margin': "50px auto" }}>
                <Button variant='contained' color='primary'>
                  送出
                </Button>
              </div>
              <div className="d-inline-block boder-orange p-1">
                <p className="text-orange">
                  如有任何疑問<br />
                  請聯絡 support@findyourathlete.com<br />
                  謝謝！
                </p>
              </div>
            </div>
          </div>
        </div>
      </Grid>{' '}
    </Form>
  );
}
