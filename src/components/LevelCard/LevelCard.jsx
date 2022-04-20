/* eslint-disable react/prop-types */
import React from 'react';
import './LevelCard.css';

// eslint-disable-next-line react/prop-types
function LevelCard({ levelName, levelImageURL, levelCharacters }) {
  return (
    <div className="level-card">
      <img src={levelImageURL} alt="" />
      <div className="info-bar">
        <div className="name">{levelName}</div>
        <div className="characters-container">
          {levelCharacters.map((character) => (
            <img key={character.ID} src={character.imageURL} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelCard;
