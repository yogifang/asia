import React from 'react';
export const customStyles = {
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

export default customStyles;
