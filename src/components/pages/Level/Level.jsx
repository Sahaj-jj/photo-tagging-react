/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import LevelHeader from '../../LevelHeader/LevelHeader';
import CharacterDrawer from '../../CharacterDrawer/CharacterDrawer';
import './Level.css';
import { isInBounds } from '../../../utils';
import CharacterSidebar from '../../CharacterSidebar/CharacterSidebar';
import useTimer from '../../../hooks/useTimer';

function Level({ levelID }) {
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [time, startTimer] = useTimer();
  const mouseCoords = useRef({ x: 0, y: 0 });
  const levelImgRef = useRef();

  const handleClick = async (e) => {
    setShowDrawer(!showDrawer);
    if (!showDrawer) {
      const imgRect = e.target.getBoundingClientRect();
      mouseCoords.current = { x: e.clientX - imgRect.left, y: e.clientY - imgRect.top };
    }
  };

  const handleCharacterSelect = (characterID) => {
    setShowDrawer(false);

    const imgRect = levelImgRef.current.getBoundingClientRect();
    const selectedCharacter = characters.find((char) => char.ID === characterID);
    const characterCoords = {
      x: selectedCharacter.relX * imgRect.width,
      y: selectedCharacter.relY * imgRect.height,
    };

    const marker = document.querySelector('.marker');
    const markerRadius = +getComputedStyle(marker).getPropertyValue('--radius').slice(0, -2);

    if (isInBounds(mouseCoords.current, characterCoords, markerRadius)) {
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
      setLevel({ ...levelData, ID: levelSnap.id });
      const charactersData = await fetchCharacters(levelData.characters);
      setCharacters(charactersData);
    };
    fetchLevel();
  }, []);

  useEffect(() => {
    if (showDrawer) {
      const drawer = document.querySelector('.drawer-wrapper');
      drawer.style.setProperty('--posX', `${mouseCoords.current.x}px`);
      drawer.style.setProperty('--posY', `${mouseCoords.current.y}px`);
    }
  }, [showDrawer]);

  useEffect(() => {
    const foundMarkers = document.querySelectorAll('.found-marker');
    if (foundMarkers) {
      const imgRect = levelImgRef.current.getBoundingClientRect();
      foundMarkers.forEach((marker) => {
        const character = characters.find((char) => char.ID === marker.id);
        marker.style.setProperty('--posX', `${character.relX * imgRect.width}px`);
        marker.style.setProperty('--posY', `${character.relY * imgRect.height}px`);
      });
    }
  });

  useEffect(() => {
    if (!loading) {
      levelImgRef.current.classList.add('loaded');
      startTimer();
    }
  }, [loading]);

  return (
    <div className={`level-wrapper${loading ? ' loading' : ''}`}>
      {!loading && <LevelHeader name={level.name} time={time} />}
      <div className="level-content-wrapper">
        <CharacterSidebar characters={characters} />
        <div className="level-content">
          {showDrawer && (
          <div className="drawer-wrapper">
            <div className="marker" />
            <CharacterDrawer onCharacterSelect={handleCharacterSelect} characters={characters} />
          </div>
          )}
          {characters.filter((character) => character.found).map((character) => (
            <div id={character.ID} className="found-marker" />
          ))}
          <img ref={levelImgRef} src={level.imageURL} alt="" onClick={handleClick} onLoad={() => { setLoading(false); }} />
        </div>
      </div>
    </div>
  );
}

Level.propTypes = {
  levelID: PropTypes.string.isRequired,
};

export default Level;
