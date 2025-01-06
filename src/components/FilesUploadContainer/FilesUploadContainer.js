import React from 'react';
import FileUpload from '../FileUpload/FileUpload';
import './FilesUploadContainer.css'

const FilesUploadContainer = ({
  files,
  handleFileChange,
  fileDescriptions,
  handleFileDescriptionChange,
  triggerFileInput,
  handleAddFile
}) => {
  return (
    <div className='links-container'>
                {files.length!==0?<label>Fitxers:</label>:''}
      <div className="sub-links-container">
        {files.map((file, index) => (
          <div key={index} className="file-upload-container">
            <div className="width50">
              {/* Si hi ha un fitxer seleccionat, mostrar el nom, sinó mostrar el botó */}
              {file ? (
                <p>{file.name}</p>
              ) : (
                <FileUpload
                index={index}
                triggerFileInput={triggerFileInput}
                handleFileChange={handleFileChange}
                />
              )}
              <input
                type="file"
                id={`file-input-${index}`}
                accept="*"
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: 'none' }}  // Amagar l'input
              />
            </div>

            {/* Mostrar descripció del fitxer només si hi ha un fitxer seleccionat */}
            {file && (
              <div className="width50">
                <input
                  type="text"
                  placeholder="Descripció del fitxer"
                  value={fileDescriptions[index] || ''}
                  onChange={(e) => handleFileDescriptionChange(index, e)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="secondary-btn"  type="button" onClick={handleAddFile}>Afegir fitxer</button>
    </div>
  );
};

export default FilesUploadContainer;
