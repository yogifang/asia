import React , { useMemo } from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import countryList from 'react-select-country-list'

export default function SelectCountry(props) {


    const { name, label, value,error=null, onChange } = props;
    var options = useMemo(() => countryList().getData(), []);
    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
