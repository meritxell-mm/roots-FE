import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiles } from '../../hooks/useFiles';
import { useLinks } from '../../hooks/useLinks';
import { usePictures } from '../../hooks/usePictures';
import { useMembers   } from '../../hooks/useMembers';
import AddLinksContainer from '../../components/AddLinksContainer/AddLinksContainer';
import FilesUploadContainer from '../../components/FilesUploadContainer/FilesUploadContainer';
import SectionEditor from '../../components/SectionEditor/SectionEditor';
import BasicInfoForm from '../../components/BasicInfoForm/BasicInfoForm';
import InputField from '../../components/InputField/InputField';  
import { createMember } from '../../services/api';
import './AddMemberForm.css';

const AddMemberForm = () => {
  const navigate = useNavigate();
  const { files, fileDescriptions, handleFileChange, handleFileDescriptionChange, triggerFileInput, handleAddFile } = useFiles();
  const { links, addLink, handleLinkChange } = useLinks();
  const { pictures, footers, handlePictureChange, handleFooterChange, getImagePreview, handleAddPicture } = usePictures();
  const members = useMembers();

  const [formData, setFormData] = useState({
    name: '',
    surname1: '',
    surname2: '',
    biography: '',
    career: '',
    hobbies: '',
    annotations: '',
    birthDate: '',
    birthPlace: '',
    deathDate: '',
    deathPlace: '',
    occupation: '',
    partner: '',
    weddingDate: '',
    weddingPlace: '',
    father: '',
    mother: '',
    links: [],
    photos: [],
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formToSubmit.append(key, value);
      }
    });
  
    links.forEach(link => {
      formToSubmit.append('links', link);
    });
  
    pictures.forEach((picture, index) => {
      formData.append('picturesToSave', picture);
      formData.append('pictures', { path: '', footer: footers[index] });
    });
  
    files.forEach((file, index) => {
      formData.append('filesToSave', file);
      formData.append('files', { path: '', description: fileDescriptions[index] });
    });
  
    try {
      const memberData = await createMember(formToSubmit);
      alert('Familiar afegit correctament');
      navigate('/members');
    } catch (error) {
      console.error('Error en la sol·licitud:', error);
      alert('S\'ha produït un error en enviar les dades');
    }
  };

  return (
    <div className="outter-container">
      <div className="container">
        <div className="main-container">
          <fieldset className="details">
            <legend>Detalls del familiar</legend>
            
            <InputField
              label="Nom"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              highlighted
              required
            />

            <InputField
              label=""
              type="text"
              name="surname1"
              value={formData.surname1}
              onChange={handleChange}
              placeholder="Primer Cognom"
            />

            <InputField
              label=""
              type="text"
              name="surname2"
              value={formData.surname2}
              onChange={handleChange}
              placeholder="Segon Cognom"
            />

            <SectionEditor
              title="Biografia, anècdotes i històries"
              name="biography"
              value={formData.biography}
              placeholder="Quines experiències va viure?"
              onChange={handleChange}
            />
            
            <SectionEditor
              title="Carrera professional"
              name="career"
              value={formData.career}
              placeholder="A què es dedicava?"
              onChange={handleChange}
            />
            
            <SectionEditor
              title="Personalitat i aficions"
              name="hobbies"
              value={formData.hobbies}
              placeholder="Com era? Què li agradava?"
              onChange={handleChange}
            />
            
            <SectionEditor
              title="Anotacions"
              name="annotations"
              value={formData.annotations}
              placeholder="Altres anotacions destacables"
              onChange={handleChange}
            />

            <div className="related-links">
              <h2>Enllaços i fitxers relacionats</h2>
                <AddLinksContainer
                links={links}
                handleLinkChange={handleLinkChange}
                addLink={addLink}
                />
                <FilesUploadContainer
                  files={files}
                  handleFileChange={handleFileChange}
                  fileDescriptions={fileDescriptions}
                  handleFileDescriptionChange={handleFileDescriptionChange}
                  triggerFileInput={triggerFileInput}
                  handleAddFile={handleAddFile}
                />
            </div>
          </fieldset>
        </div>

        <BasicInfoForm
          formData={formData}
          handleChange={handleChange}
          members={members}
          pictures={pictures}
          footers={footers}
          handlePictureChange={handlePictureChange}
          handleFooterChange={handleFooterChange}
          triggerFileInput={triggerFileInput}
          getImagePreview={getImagePreview}
          handleAddPicture={handleAddPicture}
        />

    </div>
    <div className="btn-save-container">
        <button type="submit" className="btn-save" onClick={handleSubmit}>Afegir membre</button>
      </div>
    </div>
  );
};

export default AddMemberForm;
