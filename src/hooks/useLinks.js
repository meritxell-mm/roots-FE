import { useState } from 'react';

export const useLinks = () => {
  const [links, setLinks] = useState([]);

  const addLink = () => {
    setLinks([...links, { link: '', url: '' }]);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  return {
    links,
    addLink,
    handleLinkChange
  };
};
