import React from "react";
import {Button, InputContainer, Text, Input} from "./styled.js";

const SizeControl = ({ label, value, onChange }) => {
  return (
    <InputContainer>
      <Text>{label}:</Text>
      <Button className='decrease' onClick={() => onChange(value - 1)}>-</Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <Button onClick={() => onChange(value + 1)}>+</Button>
    </InputContainer>
  );
};

export default SizeControl;