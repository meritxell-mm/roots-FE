import React from 'react';
import './MemberPicture.css'

const MemberPicture = ({ memberData }) => {
  return (
    <div className="member-picture">
      <div className="picture placeholder">
        {memberData.photo ? (
          <img src={memberData.photo} alt="Photos" />
        ) : (
          <span>Foto no disponible</span>
        )}
      </div>
      <h3>Informació Bàsica</h3>
    </div>
  );
};

export default MemberPicture;
