/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import LevelCard from '../../LevelCard/LevelCard';
import './Home.css';

// eslint-disable-next-line react/prop-types
function Home({ levels, characters }) {
  return (
    <div className="home-page">
      <h1 className="heading">Wheres Waldo</h1>
      <div className="cards-container">
        {levels.map((level) => (
          <Link key={level.ID} to={`/levels/${level.ID}`}>
            <LevelCard
              levelID={level.ID}
              levelName={level.name}
              levelImageURL={level.imageURL}
              levelCharacters={characters
                .filter((character) => level.characters
                  .map((levelChar) => levelChar.ID).includes(character.ID))}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
