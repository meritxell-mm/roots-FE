import React from 'react';

const FileUpload = ({ index, handleFileChange, triggerFileInput }) => {
  return (
    <div className="file-upload-container">
      <button
        type="button"
        className="file-upload-button"
        onClick={() => triggerFileInput(`file-input-${index}`)}
      >
        Pujar fitxer
      </button>
      <input
        type="file"
        id={`file-input-${index}`}
        accept="*"
        onChange={(e) => handleFileChange(index, e)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload;
