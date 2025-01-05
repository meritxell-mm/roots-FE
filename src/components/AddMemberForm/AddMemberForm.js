import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMemberForm.css';
import { BtnBold, BtnItalic, BtnBulletList, BtnNumberedList, BtnClearFormatting, BtnUnderline, BtnStyles, Editor, EditorProvider, Toolbar, BtnLink} from 'react-simple-wysiwyg';

const AddMemberForm = () => {

  const navigate = useNavigate(); 

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
    links:[],
    photos: [],  
    files: [],   
  });

  const [members, setMembers] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [footers, setFooters] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Manejar l'addició d'una nova imatge
  const handleAddPicture = () => {
    setPictures([...pictures, '']);
    setFooters([...footers, '']);
  };

  // Manejar l'actualització de la ruta de la imatge
  const handlePictureChange = (index, event) => {
    const newPictures = [...pictures];
    newPictures[index] = event.target.files[0];
    setPictures(newPictures);
  };

  const handleMembersSelectionChange = (index, selectedOptions) => {
    const newSelectedMembers = [...selectedMembers];
    newSelectedMembers[index] = Array.from(selectedOptions).map(option => option.value);
    setSelectedMembers(newSelectedMembers);
  };

  // Manejar el peu de foto per a cada imatge
  const handleFooterChange = (index, event) => {
    const newFooters = [...footers];
    newFooters[index] = event.target.value;
    setFooters(newFooters);
  };

  // Manejar l'addició d'un fitxer
  const handleAddFile = () => {
    setFiles([...files, '']);
    setFileDescriptions([...fileDescriptions, '']);
  };

  // Manejar el canvi d'un fitxer
  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  // Manejar la descripció d'un fitxer
  const handleFileDescriptionChange = (index, event) => {
    const newDescriptions = [...fileDescriptions];
    newDescriptions[index] = event.target.value;
    setFileDescriptions(newDescriptions);
  };

  // Càrrega de membres de la base de dades quan el component es munta
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/members'); // URL de la API per obtenir membres
        const data = await response.json();
        setMembers(data); // Guardem els membres carregats
      } catch (error) {
        console.error('Error al carregar els membres:', error);
      }
    };

    fetchMembers();
  }, []);

  // links
  const [links, setLinks] = useState([]);

  const addLink = () => {
    setLinks([...links, { link: '', url: '' }]);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  //submitting form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportament per defecte del formulari

    const formToSubmit = new FormData();

    if (formData.name) formToSubmit.append('name', formData.name);
    if (formData.surname1) formToSubmit.append('surname1', formData.surname1);
    if (formData.surname2) formToSubmit.append('surname2', formData.surname2);
    if (formData.biography) formToSubmit.append('biography', formData.biography);
    if (formData.career) formToSubmit.append('career', formData.career);
    if (formData.hobbies) formToSubmit.append('hobbies', formData.hobbies);
    if (formData.annotations) formToSubmit.append('annotations', formData.annotations);
    if (formData.birthDate) formToSubmit.append('birthDate', formData.birthDate);
    if (formData.birthPlace) formToSubmit.append('birthPlace', formData.birthPlace);
    if (formData.deathDate) formToSubmit.append('deathDate', formData.deathDate);
    if (formData.deathPlace) formToSubmit.append('deathPlace', formData.deathPlace);
    if (formData.occupation) formToSubmit.append('occupation', formData.occupation);
    if (formData.partner) formToSubmit.append('partner', formData.partner);
    if (formData.weddingDate) formToSubmit.append('weddingDate', formData.weddingDate);
    if (formData.weddingPlace) formToSubmit.append('weddingPlace', formData.weddingPlace);
    if (formData.father) formToSubmit.append('father', formData.father);
    if (formData.mother) formToSubmit.append('mother', formData.mother);

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
      const response = await fetch('http://localhost:8080/api/members/create', {
        method: 'POST',
        body: formToSubmit,
      });

      if (response.ok) {
        alert('Familiar afegit correctament');
        navigate('/members');
      } else {
        alert('Error al guardar les dades');
      }
    } catch (error) {
      console.error('Error en la sol·licitud:', error);
      alert('S\'ha produït un error en enviar les dades');
    }
  };

  const triggerFileInput = (id) => {
    document.getElementById(id).click();
  };

  const getImagePreview = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  return (
    <div className="outter-container">
      <div className="container">
        <div className="main-container">
          <fieldset className='details'>
            <legend>Detalls del familiar</legend>

            <h2>Nom</h2>
            <input 
              type="text" 
              name="name" 
              className='name-input'
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Nom" 
              required 
            />

            <input 
              type="text" 
              name="surname1" 
              className='name-input'
              value={formData.surname1} 
              onChange={handleChange} 
              placeholder="Primer Cognom" 
              required 
            />

            <input 
              type="text" 
              name="surname2" 
              className='name-input'
              value={formData.surname2} 
              onChange={handleChange} 
              placeholder="Segon Cognom" 
              required 
            />

            <div className="section-detail">
              <h2>Biografia, anècdotes i històries</h2>
              <EditorProvider>
                <Editor name='biography' value={formData.biography} placeholder='Quines experiències va viure?' onChange={handleChange}>
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <BtnLink/>
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>

            <div className="section-detail">
              <h2>Carrera professional</h2>
              <EditorProvider>
                <Editor name='career' value={formData.career} placeholder='A què es dedicava?' onChange={handleChange}>
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <BtnLink/>
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>

            <div className="section-detail">
              <h2>Personalitat i aficions</h2>
              <EditorProvider>
                <Editor name='hobbies' value={formData.hobbies} placeholder='Com era? Què li agradava?' onChange={handleChange}>
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <BtnLink/>
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>

            <div className="section-detail">
              <h2>Anotacions</h2>
              <EditorProvider>
                <Editor name='annotations' value={formData.annotations} placeholder='Altres anotacions destacables' onChange={handleChange}>
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <BtnLink/>
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>

            <div className="related-links">
              <h2>Enllaços i fitxers relacionats</h2>
          <div id="docs-container" className='links-container'>
          {links.length!==0?<label>Enllaços:</label>:''}
          <div className='sub-links-container'>
            {links.map((link, index) => (
              <div key={index} className="url-field">
                <input
                  type="text"
                  className='width50'
                  placeholder="Nom enllaç"
                  value={link.link}
                  onChange={(e) => handleLinkChange(index, 'link', e.target.value)}
                />
                <input
                  type="url"
                  className='width50'
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                />
              </div>
            ))}
            </div>
          </div>
              <button className="secondary-btn" type="button" onClick={addLink}>Afegir enllaç</button>
              <div className='links-container'>
              {files.length!==0?<label>Fitxers:</label>:''}
              <div className='sub-links-container'>
              {files.map((file, index) => (
          <div key={index} className='file-upload-container'>
            <div className="width50">
              {/* Si hi ha un fitxer seleccionat, mostrar el nom, sinó mostrar el botó */}
              {file ? (
                <p>{file.name}</p>
              ) : (
                <button
                  type="button"
                  className="file-upload-button"
                  onClick={() => triggerFileInput(`file-input-${index}`)}
                >
                  Pujar fitxer
                </button>
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
              <div className='width50'>
                <input
                  type="text"
                  placeholder="Descripció del fitxer"
                  value={fileDescriptions[index]}
                  onChange={(e) => handleFileDescriptionChange(index, e)}
                />
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
      <button className="secondary-btn"  type="button" onClick={handleAddFile}>Afegir fitxer</button>

            </div>
          </fieldset>
        </div>

      <div className="basic-info">

        <label>Data de naixement:</label>
        <input 
          type="date" 
          name="birthDate" 
          placeholder="dd/mm/aaaa" 
          value={formData.birthDate} 
          onChange={handleChange} 
        />

        <label>Lloc de naixement:</label>
        <input 
          type="text" 
          name="birthPlace" 
          value={formData.birthPlace} 
          onChange={handleChange} 
        />

        <label>Data de mort:</label>
        <input 
          type="date" 
          name="deathDate" 
          value={formData.deathDate} 
          onChange={handleChange} 
        />

        <label>Lloc de mort:</label>
        <input 
          type="text" 
          name="deathPlace" 
          value={formData.deathPlace} 
          onChange={handleChange} 
        />

        <label>Professió:</label>
        <input 
          type="text" 
          name="occupation" 
          value={formData.occupation} 
          onChange={handleChange} 
        />
        
        <label>Parella:</label>
        <select 
          name="partner" 
          value={formData.partner} 
          onChange={handleChange}
        >
          <option value="" disabled hidden>Selecciona un membre de la família</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.name} {member.surname1} {member.surname2}
            </option>
          ))}
        </select>

        <label>Data de casament:</label>
        <input 
          type="date" 
          name="weddingDate" 
          value={formData.weddingDate} 
          onChange={handleChange} 
        />

        <label>Lloc de casament:</label>
        <input 
          type="text" 
          name="weddingPlace" 
          value={formData.weddingPlace} 
          onChange={handleChange} 
        />

        
        <label>Pare:</label>
        <select 
          name="father" 
          value={formData.father} 
          onChange={handleChange}
        >
          <option value="" disabled hidden>Selecciona un membre de la família</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.name} {member.surname1} {member.surname2}
            </option>
          ))}
        </select>

        <label>Mare:</label>
        <select 
          name="mother" 
          value={formData.mother} 
          onChange={handleChange}
        >
          <option value="" disabled hidden>Selecciona un membre de la família</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.name} {member.surname1} {member.surname2}
            </option>
          ))}
        </select>

        <div>
        <label>Fotos:</label>
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

      </div>
    </div>
    <div className="btn-save-container">
        <button type="submit" className="btn-save" onClick={handleSubmit}>Afegir membre</button>
      </div>
    </div>
  );
};

export default AddMemberForm;
