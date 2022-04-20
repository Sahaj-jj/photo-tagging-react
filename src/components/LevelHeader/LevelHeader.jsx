import React from 'react';
import PropTypes from 'prop-types';
import './LevelHeader.css';
import Timer from '../Timer/Timer';

function LevelHeader({ name, characters }) {
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
      <div className="name">{name}</div>
      <Timer />
    </div>
  );
}

LevelHeader.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LevelHeader;
