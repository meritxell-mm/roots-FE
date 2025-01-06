import React from 'react';
import { BtnBold, BtnItalic, BtnBulletList, BtnNumberedList, BtnClearFormatting, BtnUnderline, BtnStyles, Editor, EditorProvider, Toolbar, BtnLink} from 'react-simple-wysiwyg';
import './SectionEditor.css';

const SectionEditor = ({ title, name, value, placeholder, onChange }) => {
  return (
    <div className="section-detail">
      <h2>{title}</h2>
      <EditorProvider>
        <Editor name={name} value={value} placeholder={placeholder} onChange={onChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default SectionEditor;
