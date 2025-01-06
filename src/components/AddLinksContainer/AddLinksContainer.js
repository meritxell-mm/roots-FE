import React from 'react';
import './AddLinksContainer.css'

const AddLinksContainer = ({ links, handleLinkChange, addLink }) => {
  return (
    <div>
      <div id="docs-container" className='links-container'>
                  {links.length!==0?<label>Enllaços:</label>:''}
        <div className="sub-links-container">
          {links.map((link, index) => (
            <div key={index} className="url-field">
              <input
                type="text"
                className="width50"
                placeholder="Nom enllaç"
                value={link.link}
                onChange={(e) => handleLinkChange(index, 'link', e.target.value)}
              />
              <input
                type="url"
                className="width50"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="secondary-btn" type="button" onClick={addLink}>Afegir enllaç</button>
    </div>
  );
};

export default AddLinksContainer;
