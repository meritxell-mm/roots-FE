import { useState, useEffect } from 'react';
import { getMembers } from '../services/api';

export const useMembers = () => {
  const [members, setMembers] = useState([]);

  const sortMembers = (members) => {
    return [...members].sort((a, b) => {
      const dateA = a.birthDate ? new Date(a.birthDate) : new Date(0);
      const dateB = b.birthDate ? new Date(b.birthDate) : new Date(0);
  
      if (!a.birthDate && b.birthDate) return 1; 
      if (a.birthDate && !b.birthDate) return -1; 
      return dateB - dateA; 
    });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(sortMembers(data));
      } catch (error) {
        console.error('Error al carregar els membres:', error);
      }
    };

    fetchMembers();
  }, []);

  return members;
};
