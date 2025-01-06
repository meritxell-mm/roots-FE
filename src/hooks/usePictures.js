import { useState } from 'react';

export const usePictures = () => {
  const [pictures, setPictures] = useState([]);
  const [footers, setFooters] = useState([]);

  const handleAddPicture = () => {
    setPictures([...pictures, '']);
    setFooters([...footers, '']);
  };

  const handlePictureChange = (index, event) => {
    const newPictures = [...pictures];
    newPictures[index] = event.target.files[0];
    setPictures(newPictures);
  };

  const handleFooterChange = (index, event) => {
    const newFooters = [...footers];
    newFooters[index] = event.target.value;
    setFooters(newFooters);
  };

  const getImagePreview = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  return {
    pictures,
    footers,
    handleAddPicture,
    handlePictureChange,
    handleFooterChange,
    getImagePreview
  };
};
