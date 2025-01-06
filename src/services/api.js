const API_URL = 'http://localhost:8080/api';

// Obtenir tots els familiars
export const getMembers = async () => {
  try {
    const response = await fetch(`${API_URL}/members`);
    if (!response.ok) {
      throw new Error('No s\'han pogut carregar els membres');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al carregar els membres:', error);
    throw error;
  }
};

// Crear familiar
export const createMember = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/members/create`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar les dades');
      }
  
      return await response.json(); 
    } catch (error) {
      console.error('Error en la sol·licitud:', error);
      throw error; 
    }
};

// Obtenir dades d'un familiar
export const getMemberData = async (memberId) => {
    const response = await fetch(`${API_URL}/members/${memberId}`);
    if (!response.ok) throw new Error('Error en obtenir dades del familiar');
    return response.json();
};
  
// Obtenir fills/es d'un familiar
export const getMemberChildren = async (memberId) => {
    const response = await fetch(`${API_URL}/members/${memberId}/children`);
    if (!response.ok) throw new Error('Error en obtenir dades de la descendència');
    return response.json();
};
  
// Obtenir germans/es d'un familiar
export const getMemberSiblings = async (memberId) => {
    const response = await fetch(`${API_URL}/members/${memberId}/siblings`);
    if (!response.ok) throw new Error('Error en obtenir dades dels gemans/es');
    return response.json();
};