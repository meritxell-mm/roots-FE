import React from 'react';

const PicturesUploadContainer = ({ pictures, handlePictureChange, getImagePreview, triggerFileInput, footers, handleFooterChange, handleAddPicture }) => {
  return (
    <div>
    {pictures.map((picture, index) => (
      <div key={index}>
        <div className="file-upload-container">
          {/* Si hi ha imatge seleccionada, mostrar miniatura, sinó mostrar el botó */}
          {picture ? (
            <img
              src={getImagePreview(picture)}
              alt={`Miniatura de la foto ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
            />
          ) : (
            <button
              type="button"
              className="file-upload-button"
              onClick={() => triggerFileInput(`pic-input-${index}`)}
            >
              Pujar fotografia
            </button>
          )}
          <input
            type="file"
            id={`pic-input-${index}`}
            accept="image/*"
            onChange={(e) => handlePictureChange(index, e)}
            style={{ display: 'none' }}  // Amagar l'input
          />
        </div>

        {/* Mostrar peu de foto només si hi ha una foto seleccionada */}
        {picture && (
          <div>
            <input
              type="text"
              placeholder="Peu de foto"
              value={footers[index]}
              onChange={(e) => handleFooterChange(index, e)}
            />
          </div>
        )}

        {/* Mostrar selector de membres associats només si hi ha una foto}
        {picture && (
          <div>
            <label>Membres a la foto:</label>
            <select
              multiple
              value={selectedMembers[index]}
              onChange={(e) => handleMembersSelectionChange(index, e.target.selectedOptions)}
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
              )}{*/}
      </div>
    ))}
      <p><button type="button" className="secondary-btn" onClick={handleAddPicture}>Afegir fotografia</button></p>
    </div>
  );
};

export default PicturesUploadContainer;
