import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, highlighted = false, required = false }) => {
  const LabelElement = highlighted ? 'h2' : 'label';

  return (
    <div className="input-field">
      <LabelElement>{label}</LabelElement>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
