import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}
type Pros = {
    start: number;
    end: number;
    min: number;
    max:number;
    parentCallback: Function;
}


export default function RangeSlider({start, end, min, max, parentCallback}: Pros) {
  const [value, setValue] = React.useState<number[]>([start, end]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    parentCallback(newValue as number[]);
  };

  return (
    <Box sx={{ width: 600 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}