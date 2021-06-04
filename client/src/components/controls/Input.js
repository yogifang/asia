import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
    const { name, label, value, type, error = null, onChange } = props;
    return ( <
        TextField variant = 'outlined'
        label = { label }
        name = { name }
        value = { value }
        type = { type }
        onChange = { onChange } {...(error && { error: true, helperText: error }) }
        />
    );
}