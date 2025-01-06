import React from 'react';
import InputField from '../InputField/InputField';
import MemberSelector from '../MemberSelector/MemberSelector';
import PicturesUploadContainer from '../PicturesUploadContainer/PicturesUploadContainer';
import './BasicInfoForm.css';


const BasicInfoForm = ({ formData, handleChange, members, pictures, footers, handlePictureChange, handleFooterChange, triggerFileInput, getImagePreview, handleAddPicture }) => (
  <div className="basic-info">
    <InputField
      label="Data de naixement"
      type="date"
      name="birthDate"
      value={formData.birthDate}
      onChange={handleChange}
      placeholder="dd/mm/aaaa"
    />

    <InputField
      label="Lloc de naixement"
      type="text"
      name="birthPlace"
      value={formData.birthPlace}
      onChange={handleChange}
    />

    <InputField
      label="Data de mort"
      type="date"
      name="deathDate"
      value={formData.deathDate}
      onChange={handleChange}
    />

    <InputField
      label="Professió"
      type="text"
      name="occupation"
      value={formData.occupation}
      onChange={handleChange}
    />

    <MemberSelector
      label="Parella"
      name="partner"
      value={formData.partner}
      members={members}
      handleChange={handleChange}
    />

    <InputField
      label="Data de casament"
      type="date"
      name="weddingDate"
      value={formData.weddingDate}
      onChange={handleChange}
    />

    <InputField
      label="Lloc de casament"
      type="text"
      name="weddingPlace"
      value={formData.weddingPlace}
      onChange={handleChange}
    />

    <MemberSelector
      label="Pare"
      name="father"
      value={formData.father}
      members={members}
      handleChange={handleChange}
    />

    <MemberSelector
      label="Mare"
      name="mother"
      value={formData.mother}
      members={members}
      handleChange={handleChange}
    />

    <div>
      <label>Fotos:</label>
      <PicturesUploadContainer
        pictures={pictures}
        handlePictureChange={handlePictureChange}
        footers={footers}
        handleFooterChange={handleFooterChange}
        triggerFileInput={triggerFileInput}
        getImagePreview={getImagePreview}
        handleAddPicture={handleAddPicture}
      />
    </div>
  </div>
);

export default BasicInfoForm;
