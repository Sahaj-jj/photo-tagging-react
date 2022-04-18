/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import LevelHeader from '../../LevelHeader/LevelHeader';
import CharacterDrawer from '../../CharacterDrawer/CharacterDrawer';
import './Level.css';
import isInBounds from '../../../utils';

function Level({ levelID }) {
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  const handleClick = async (e) => {
    setShowDrawer(!showDrawer);
    if (!showDrawer) {
      const imgRect = e.target.getBoundingClientRect();
      setCoords({ x: e.clientX - imgRect.left, y: e.clientY - imgRect.top });
    }
  };

  const handleCharacterSelect = (characterID) => {
    setShowDrawer(!showDrawer);

    const imgRect = document.querySelector('.level-content > img').getBoundingClientRect();
    const selectedCharcater = characters.find((char) => char.ID === characterID);
    const characterCoords = {
      x: selectedCharcater.relX * imgRect.width,
      y: selectedCharcater.relY * imgRect.height,
    };

    const marker = document.querySelector('.marker');
    const markerRadius = +getComputedStyle(marker).getPropertyValue('--radius').slice(0, -2);

    if (isInBounds(coords, characterCoords, markerRadius)) {
      setCharacters(characters.map((character) => (character.ID === characterID
        ? { ...character, found: true }
        : character)));
    }
  };

  useEffect(() => {
    const fetchCharacters = async (charactersInfo) => {
      const charactersData = [];
      await Promise.all(charactersInfo.map(async (character) => {
        const charSnap = await getDoc(doc(getFirestore(), 'characters', character.ID));
        charactersData.push(
          {
            ...charSnap.data(), ID: charSnap.id, relX: character.relX, relY: character.relY,
          },
        );
      }));
      return charactersData;
    };

    const fetchLevel = async () => {
      const levelSnap = await getDoc(doc(getFirestore(), 'levels', levelID));
      const levelData = levelSnap.data();
      setLevel({ ID: levelSnap.id, name: `${levelData.location}`, imageURL: levelData.imageURL });
      const charactersData = await fetchCharacters(levelData.characters);
      setCharacters(charactersData);
    };
    fetchLevel();
  }, []);

  useEffect(() => {
    if (showDrawer) {
      const marker = document.querySelector('.marker');
      marker.style.setProperty('--posX', `${coords.x}px`);
      marker.style.setProperty('--posY', `${coords.y}px`);

      const drawer = document.querySelector('.drawer-wrapper');
      drawer.style.setProperty('--posX', `${coords.x}px`);
      drawer.style.setProperty('--posY', `${coords.y}px`);
    }
  }, [coords]);

  useEffect(() => {
    const foundMarkers = document.querySelectorAll('.found-marker');
    if (foundMarkers) {
      const imgRect = document.querySelector('.level-content > img').getBoundingClientRect();
      foundMarkers.forEach((marker) => {
        const character = characters.find((char) => char.ID === marker.id);
        marker.style.setProperty('--posX', `${character.relX * imgRect.width}px`);
        marker.style.setProperty('--posY', `${character.relY * imgRect.height}px`);
      });
    }
  }, [showDrawer]);

  useEffect(() => {
    if (!loading) document.querySelector('.level-content > img').classList.add('loaded');
  }, [loading]);

  return (
    <div className={`level-wrapper${loading ? ' loading' : ''}`}>
      <LevelHeader characters={characters} />
      <div className="level-content">
        {showDrawer && <div className="marker" />}
        {showDrawer && (
        <div className="drawer-wrapper">
          <CharacterDrawer onCharacterSelect={handleCharacterSelect} characters={characters} />
        </div>
        )}
        {characters.filter((character) => character.found).map((character) => (
          <div id={character.ID} className="found-marker" />
        ))}
        <img src={level.imageURL} alt="" onClick={handleClick} onLoad={() => { setLoading(false); }} />
      </div>
    </div>
  );
}

Level.propTypes = {
  levelID: PropTypes.string.isRequired,
};

export default Level;
