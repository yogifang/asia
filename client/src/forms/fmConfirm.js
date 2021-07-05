import React from 'react';
import { Grid } from '@material-ui/core';
import ImgChecked from '../assets/buttons/imgChecked.png';

import { useForm, Form } from '../components/useForm';

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

  const { values, errors, setErrors, resetForm } = useForm(initialFValues, true, validate);

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
        <div className='div-scroll'>
          <div className='row'>
            <div className='col s12 center-align'>
              <div className='ImgChecked'>
                <img src={ImgChecked} alt='imageButton' width='150' />
              </div>
              <p className='text-purple'>
                已送出
                <br />I hereby.
              </p>
            </div>
          </div>
        </div>
      </Grid>{' '}
    </Form>
  );
}
