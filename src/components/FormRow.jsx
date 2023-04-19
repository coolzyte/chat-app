import React from 'react';

const FormRow = ({
  type,
  name,
  value,
  placeholder,
  handleChange,
  handleKey,
  labelText,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKey}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
