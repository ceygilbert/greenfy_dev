import React from 'react';

const DropdownList = ({ options, selectedOption, handleChange }) => {
  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;