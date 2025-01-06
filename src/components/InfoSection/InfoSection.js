import React from 'react';
import './InfoSection.css'

const InfoSection = ({ title, content }) => (
    <div className="section-detail">
      <h2>{title}</h2>
      {content ? (
        <div className="html-preview" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="disabled">Sense informació</p>
      )}
    </div>
);

export default InfoSection;