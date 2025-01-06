import React, { useEffect, useState } from 'react';
import MemberCard from '../../components/MemberCard/MemberCard';
import { useNavigate } from 'react-router-dom';
import { useMembers } from '../../hooks/useMembers';
import { LITERALS } from '../../locals/literals';
import './MembersList.css'

const MembersList = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState(null);
  const fetchedMembers = useMembers();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedMembers) {
      setMembers(fetchedMembers);
      setLoading(false);
    }
  }, [fetchedMembers]);

  if (loading) {
    return <p>{LITERALS.LOADING_MESSAGE}</p>;
  }

  const handleAddMember = () => {
    navigate(`/members/create`);
  };

  const handleOnClickMember = (memberID) => {
    navigate(`/members/${memberID}`);
  };

  return (
    <div className="member-list-container">
      <div className="member-list-header">
        <h1>Familiars</h1>
        <button className="add-member-button" onClick={handleAddMember}>
          Afegir Familiar
        </button>
      </div>
      <div className="member-list">
        {members.map((member) => (
          <MemberCard
            member={member}
            onClick={() => handleOnClickMember(member.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersList;
