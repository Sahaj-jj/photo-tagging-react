import React from 'react';
import PropTypes from 'prop-types';
import './CharacterSidebar.css';

function CharacterSidebar({ characters }) {
  return (
    <div className="character-sidebar">
      <div className="characters-container">
        {characters.map((character) => (
          <div key={character.ID} className={`character-wrapper${character.found ? ' found' : ''}`}>
            <img src={character.imageURL} alt="" />
            <div className="character-name">{character.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

CharacterSidebar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharacterSidebar;
