import React from "react";
import {Button, InputContainer, Text, Input} from "./styled.js";

const SizeControl = ({ label, value, onChange }) => {

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/^0+/, '');
    const value = sanitizedValue === '' ? '' : Math.min(Number(sanitizedValue), 100);
    onChange(value);
  };

  return (
    <InputContainer>
      <Text>{label}:</Text>

      <div className="controllers">
        <Button className='decrease' onClick={() => onChange(value - 1)}>-</Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => handleChange(e)}
          max={100}
        />
        <Button onClick={() => onChange(value + 1)}>+</Button>
      </div>
    </InputContainer>
  );
};

export default SizeControl;