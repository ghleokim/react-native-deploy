import * as React from 'react';
import { TimePickerAndroid } from 'react-native';

const Option = ({
  label,
  value,
}) => React.createElement('option', {
  children: label,
  value,
});

export const WebPicker = ({
  style,
  currentValue,
  onChange,
  options,
}) => (
  React.createElement('input', {
    value: currentValue,
    className: style,
    type: 'time',
    style: {height: 30 + 'px', borderRadius: 10 + 'px',
    webkitAppearance: 'none',
    },
    onChange: (event) => onChange(event.target.value),
    // children: options.map(option => (
    //   <Option key={`${option.label}_${option.value}`} {...option} />
    // )),
  })
);


export default WebPicker;