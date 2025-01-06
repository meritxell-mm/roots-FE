import React from 'react';
import MemberLink from '../MemberLink/MemberLink';

const InfoItem = ({ label, value }) => {
  return (
    <div className="info-item">
      <label>{label}:</label>
      <span>{value}</span>
    </div>
  );
};

const InfoItemWithLink = ({ label, member }) => {
  return (
    <div className="info-item">
      <label>{label}:</label>
      <span><MemberLink member={member} /></span>
    </div>
  );
};

export { InfoItem, InfoItemWithLink };
