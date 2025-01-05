import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MemberProfile.css';


const MemberProfile = () => {
  const { memberId } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [childrenData, setChildrenData] = useState([]);
  const [siblingsData, setSiblingsData] = useState([]);

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    //dd/MM/yyyy
    return date.toLocaleDateString('ca-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtenir dades del familiar
        const response = await fetch(`http://localhost:8080/api/members/${memberId}`);
        const data = await response.json();
        setMemberData(data);

        // Obtenir fills del familiar
        const childrenResponse = await fetch(`http://localhost:8080/api/members/${memberId}/children`);
        const childrenData = await childrenResponse.json();
        setChildrenData(childrenData);

        // Obtenir germans del familiar
        const siblingsResponse = await fetch(`http://localhost:8080/api/members/${memberId}/siblings`);
        const siblingsData = await siblingsResponse.json();
        setSiblingsData(siblingsData);
      } catch (error) {
        console.error('Error al carregar les dades:', error);
      }
    };

    // Carregar les dades només si `memberId` està disponible
    if (memberId) {
      fetchData();
    }
  }, [memberId]);


  if (!memberData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="main-container">
      <fieldset className='details'>
      <legend><h1>{memberData.name?memberData.name:''} {memberData.surname1} {memberData.surname2? memberData.surname2:''}</h1></legend>
        <div className="section-detail">
          <h2>Biografia, anècdotes i històries</h2>
          {memberData.biography ? <div className="html-preview" dangerouslySetInnerHTML={{ __html: memberData.biography }} /> : <p className='disabled'>Sense informació</p>}
        </div>
        <div className="section-detail">
          <h2>Carrera professional</h2>
          {memberData.career ? <div className="html-preview" dangerouslySetInnerHTML={{ __html: memberData.career }} /> : <p className='disabled'>Sense informació</p>}
        </div>
        <div className="section-detail">
          <h2>Personalitat i aficions</h2>
          {memberData.hobbies ? <div className="html-preview" dangerouslySetInnerHTML={{ __html: memberData.hobbies }} /> : <p className='disabled'>Sense informació</p>}
        </div>
        <div className="section-detail">
          <h2>Anotacions</h2>
          {memberData.annotations ? <div className="html-preview" dangerouslySetInnerHTML={{ __html: memberData.annotations }} /> : <p className='disabled'>Sense informació</p>}
        </div>
      </fieldset>
      </div>
      <div className="basic-info">
        <div className="picture placeholder">
          {memberData.photo ? (
            <img src={memberData.photo} alt="Fotos" />
          ) : (
            <span>Foto no disponible</span>
          )}
        </div>
        <h3>Informació Bàsica</h3>
        <div className="info-item">
          <label>Data de naixement:</label>
          <span>{memberData.birthDate ? formatDate(memberData.birthDate) : '-'}</span>
        </div>
        <div className="info-item">
          <label>Lloc de naixement:</label>
          <span>{memberData.birthPlace ? memberData.birthPlace : '-'}</span>
        </div>
        <div className="info-item">
          <label>Data de mort:</label>
          <span>{memberData.deathDate ? formatDate(memberData.deathDate) : '-'}</span>
        </div>
        <div className="info-item">
          <label>Lloc de mort:</label>
          <span>{memberData.deathPlace ? memberData.deathPlace : '-'}</span>
        </div>
        <div className="info-item">
          <label>Professió:</label>
          <span>{memberData.occupation ? memberData.occupation : '-'}</span>
        </div>
        <div className="info-item">
          <label>Parella:</label>
          <span>{memberData.partner ? <a href={`/members/${memberData.partner.id}`}>{memberData.partner.name? memberData.partner.name:''} {memberData.partner.surname1} {memberData.partner.surname2? memberData.partner.surname2:''}</a> : '-'}</span>
        </div>
        <div className="info-item">
          <label>Data de casament:</label>
          <span>{memberData.weddingDate ? formatDate(memberData.weddingDate) : '-'}</span>
        </div>
        <div className="info-item">
          <label>Lloc de casament:</label>
          <span>{memberData.weddingPlace ? memberData.weddingPlace : '-'}</span>
        </div>
        <div className="info-item">
          <label>Mare:</label>
          <span>{memberData.mother ? <a href={`/members/${memberData.mother.id}`}>{memberData.mother.name? memberData.mother.name:''} {memberData.mother.surname1} {memberData.mother.surname2? memberData.mother.surname2:''}</a> : '-'}</span>
        </div>
        <div className="info-item">
          <label>Pare:</label>
          <span>{memberData.father ? <a href={`/members/${memberData.father.id}`}>{memberData.father.name? memberData.father.name:''} {memberData.father.surname1} {memberData.father.surname2? memberData.father.surname2:''}</a> : '-'}</span>
        </div>
        <div className="info-item">
          <label>Germanes i germans:</label>
          {siblingsData.length!==0 ? siblingsData.map((member, index) => (
              <p><a href={`/members/${member.id}`}>{member.name? member.name:''} {member.surname1} {member.surname2? member.surname2:''}</a></p>
          )) : <span>-</span>}
        </div>
        <div className="info-item">
          <label>Filles i fills:</label>
          {childrenData.length!==0 ? childrenData.map((member, index) => (
              <p><a href={`/members/${member.id}`}>{member.name? member.name:''} {member.surname1} {member.surname2? member.surname2:''}</a></p>
          )) : <span>-</span>}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
