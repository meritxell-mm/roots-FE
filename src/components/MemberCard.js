import React from 'react';


const MemberCard = ({ member }) => {
  return (
    <div className="member-card">
      {member.photo && <img src={URL.createObjectURL(member.photo)} alt={member.name} />}
      <h3>{member.name}</h3>
      <p><strong>Data de Naixement:</strong> {member.birthDate}</p>
      <p><strong>Lloc de Naixement:</strong> {member.birthPlace}</p>
      <p><strong>Biografia:</strong> {member.biography}</p>
    </div>
  );
};

export default MemberCard;
