import React from 'react';
import PropTypes from 'prop-types';
import './LevelHeader.css';

function LevelHeader({ characters }) {
  return (
    <div className="level-header">
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

LevelHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LevelHeader;
