import React from 'react';
import { InfoItem, InfoItemWithLink } from '../InfoItem/InfoItem';
import { formatDate } from '../../utils/dateUtils';
import MemberLink from '../MemberLink/MemberLink';
import MemberPicture from '../MemberPicture/MemberPicture';
import './BasicInfo.css'

const BasicInfo = ({ memberData, siblingsData, childrenData }) => {
  return (
    <div className="basic-info">
      <MemberPicture memberData={memberData} />

      <InfoItem label="Data de naixement" value={memberData.birthDate ? formatDate(memberData.birthDate) : '-'} />
      <InfoItem label="Lloc de naixement" value={memberData.birthPlace || '-'} />
      <InfoItem label="Data de mort" value={memberData.deathDate ? formatDate(memberData.deathDate) : '-'} />
      <InfoItem label="Lloc de mort" value={memberData.deathPlace || '-'} />
      <InfoItem label="Professió" value={memberData.occupation || '-'} />
      
      {/* Usamos InfoItemWithLink per mostrar enllaços de membres com la parella, mare i pare */}
      <InfoItemWithLink label="Parella" member={memberData.partner} />
      <InfoItemWithLink label="Data de casament" member={memberData.weddingDate ? formatDate(memberData.weddingDate) : '-'} />
      <InfoItemWithLink label="Lloc de casament" member={memberData.weddingPlace || '-'} />
      
      <InfoItemWithLink label="Mare" member={memberData.mother} />
      <InfoItemWithLink label="Pare" member={memberData.father} />

      <div className="info-item">
        <label>Germanes i germans:</label>
        {siblingsData.length !== 0
          ? siblingsData.map((sibling) => (
              <p key={sibling.id}>
                <MemberLink member={sibling} />
              </p>
            ))
          : <span>-</span>}
      </div>

      <div className="info-item">
        <label>Filles i fills:</label>
        {childrenData.length !== 0
          ? childrenData.map((child) => (
              <p key={child.id}>
                <MemberLink member={child} />
              </p>
            ))
          : <span>-</span>}
      </div>
    </div>
  );
};

export default BasicInfo;
