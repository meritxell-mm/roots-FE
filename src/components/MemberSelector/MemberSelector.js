import React from 'react';

const MemberSelector = ({ label, name, value, members, handleChange }) => {
  return (
    <div className="member-selector">
      <label>{label}</label>
      <select name={name} value={value} onChange={handleChange}>
        <option value="" disabled hidden>Selecciona un membre de la família</option>
        {members.map(member => (
          <option key={member.id} value={member.id}>
            {member.name} {member.surname1} {member.surname2}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MemberSelector;
