import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberData, getMemberChildren, getMemberSiblings } from '../../services/api';
import { formatDate } from '../../utils/dateUtils';
import { getFullName } from '../../utils/memberUtils';
import InfoSection from '../../components/InfoSection/InfoSection';
import './MemberProfile.css';
import BasicInfo from '../../components/BasicInfo/BasicInfo';


const MemberProfile = () => {
  const { memberId } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [childrenData, setChildrenData] = useState([]);
  const [siblingsData, setSiblingsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [member, children, siblings] = await Promise.all([
          getMemberData(memberId),
          getMemberChildren(memberId),
          getMemberSiblings(memberId),
        ]);

        setMemberData(member);
        setChildrenData(children);
        setSiblingsData(siblings);
      } catch (error) {
        console.error('Error al carregar les dades:', error);
      }
    };

    if (memberId) {
      fetchData();
    }
  }, [memberId]);


  if (!memberData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="main-container">
      <fieldset className="details">
        <legend>
          <h1>
            {getFullName(memberData)}
          </h1>
        </legend>
        <InfoSection title="Biografia, anècdotes i històries" content={memberData.biography} />
        <InfoSection title="Carrera professional" content={memberData.career} />
        <InfoSection title="Personalitat i aficions" content={memberData.hobbies} />
        <InfoSection title="Anotacions" content={memberData.annotations} />
      </fieldset>
      </div>
      <BasicInfo
        memberData={memberData}
        siblingsData={siblingsData}
        childrenData={childrenData}
      />
    </div>
  );
};

export default MemberProfile;
