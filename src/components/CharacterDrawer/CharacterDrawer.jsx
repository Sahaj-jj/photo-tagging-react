import React from 'react';
import PropTypes from 'prop-types';
import './CharacterDrawer.css';

function CharacterDrawer({ onCharacterSelect, characters }) {
  return (
    <div className="character-drawer">
      {characters.map((character) => (character.found ? null : (
        <button
          type="button"
          key={character.ID}
          className="character-wrapper"
          onClick={() => { onCharacterSelect(character.ID); }}
        >
          <img src={character.imageURL} alt="" />
          <div className="character-name">{character.name}</div>
        </button>
      )))}
    </div>
  );
}

CharacterDrawer.propTypes = {
  onCharacterSelect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharacterDrawer;
