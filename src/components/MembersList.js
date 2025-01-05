import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import MemberCard from './MemberCard/MemberCard';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/members')
      .then(response => {
        setMembers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los miembros:", error);
        setLoading(false);
      });
  }, []);  

  if (loading) {
    return <p>Carregant a la tieta Dolors...</p>;
  }

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  return (
    
      <div className="container">      
      <div className="family-tree">

      </div>
    </div>
  );
};

export default MembersList;
