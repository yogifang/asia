import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function MonthPicker(props) {
  const { name, label, value, onChange } = props;
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        label={label}
        format='MMM/yyyy'
       
        views={['year', 'month']}
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />{' '}
    </MuiPickersUtilsProvider>
  );
}
