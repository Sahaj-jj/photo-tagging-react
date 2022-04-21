/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdLeaderboard } from 'react-icons/md';
import LevelCard from '../../LevelCard/LevelCard';
import './Home.css';

// eslint-disable-next-line react/prop-types
function Home({ levels, characters }) {
  return (
    <div className="home-page">
      <div className="header">
        <h1 className="heading">Wheres Waldo</h1>
        <Link to="/leaderboards">
          <button type="button" className="to-leaderboard">
            <MdLeaderboard />
            <div>Leaderboards</div>
          </button>
        </Link>
      </div>
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
