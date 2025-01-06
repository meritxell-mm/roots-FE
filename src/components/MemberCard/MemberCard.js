import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import './MemberCard.css'; 

const MemberCard = ({ member, onClick }) => {
  return (
    <div className="member-card" onClick={onClick}>
      {/*proximament
      <div className="member-card-header">  
        <img
          src={member.profilePicture || '/default-profile.png'}
          alt={`${member.name} ${member.surname1}`}
          className="member-card-image"
        />
      </div>/*/}
      <div className="member-card-body">
        <h2 className="member-card-name">{member.name} {member.surname1} {member.surname2}</h2>
        <p className="member-card-dates">
          {member.birthDate ? `${formatDate(member.birthDate)}` : ''}
          {member.deathDate ? ` - ${formatDate(member.deathDate)}` : ''}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
