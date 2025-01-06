import { useState } from 'react';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState([]);

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleFileDescriptionChange = (index, event) => {
    const newDescriptions = [...fileDescriptions];
    newDescriptions[index] = event.target.value;
    setFileDescriptions(newDescriptions);
  };

  const handleAddFile = () => {
    setFiles([...files, '']);
    setFileDescriptions([...fileDescriptions, '']);
  };

  const triggerFileInput = (id) => {
    document.getElementById(id).click();
  };

  return {
    files,
    fileDescriptions,
    triggerFileInput,
    handleAddFile,
    handleFileChange,
    handleFileDescriptionChange
  };
};
