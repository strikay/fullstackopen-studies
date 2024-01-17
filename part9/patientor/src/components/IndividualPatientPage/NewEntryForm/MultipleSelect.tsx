import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(elementValue: string, selectedValues: string[], theme: Theme) {
  return {
    fontWeight:
      selectedValues.indexOf(elementValue) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
interface MultipleSelectProps {
    allValues: string[];
    selectedValues: string[];
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}
const MultipleSelect = (props: MultipleSelectProps) => {
  const theme = useTheme();
  const {allValues, selectedValues, setSelectedValues} = props;

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl variant='standard' fullWidth>
        <InputLabel id="demo-multiple-name-label">Diagnostic Codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedValues}
          onChange={handleChange}
          /* input={<OutlinedInput label="Diagnostic Codes" />} */
          MenuProps={MenuProps}
        >
          {allValues.map((elementValue) => {
            return (
                <MenuItem
                key={elementValue}
                value={elementValue}
                style={getStyles(elementValue, selectedValues, theme)}
                >
                {elementValue}
                </MenuItem>
            );
           }
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default  MultipleSelect;