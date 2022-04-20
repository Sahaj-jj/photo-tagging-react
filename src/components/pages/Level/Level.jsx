/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  getFirestore, doc, getDoc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import LevelHeader from '../../LevelHeader/LevelHeader';
import CharacterDrawer from '../../CharacterDrawer/CharacterDrawer';
import './Level.css';
import { isInBounds } from '../../../utils';
import CharacterSidebar from '../../CharacterSidebar/CharacterSidebar';
import useTimer from '../../../hooks/useTimer';
import LeaderboardModal from '../../LeaderboardModal/LeaderboardModal';
import useMouse from '../../../hooks/useMouse';

function Level({ levelID }) {
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [win, setWin] = useState(false);
  const [time, startTimer, stopTimer] = useTimer();
  const [mouseCoords, handleMouseMove] = useMouse();
  const levelImgRef = useRef();

  const levelWin = async () => {
    setWin(true);
    stopTimer();
    levelImgRef.current.style.pointerEvents = 'none';
    // await updateDoc(doc(getFirestore(), 'leaderboards', level.leaderboardID), {
    //   entries: arrayUnion({
    //     name: 'NEW',
    //     time: `${time}`,
    //   }),
    // });
  };

  const handleCharacterSelect = (characterID) => {
    setShowDrawer(false);

    const imgRect = levelImgRef.current.getBoundingClientRect();
    const selectedCharacter = characters.find((char) => char.ID === characterID);
    const characterCoords = {
      x: selectedCharacter.relX * imgRect.width,
      y: selectedCharacter.relY * imgRect.height,
    };

    if (isInBounds(mouseCoords, characterCoords, 20)) {
      setCharacters(characters.map((character) => (character.ID === characterID
        ? { ...character, found: true }
        : character)));

      if (characters
        .filter((character) => character.ID !== selectedCharacter.ID)
        .every((character) => character.found)) {
        levelWin();
      }
    }
  };

  useEffect(() => {
    const fetchLevel = async () => {
      const levelSnap = await getDoc(doc(getFirestore(), 'levels', levelID));
      const levelData = levelSnap.data();
      setLevel({ ...levelData, ID: levelSnap.id });
      const charactersData = [];
      await Promise.all(levelData.characters.map(async (character) => {
        const charSnap = await getDoc(doc(getFirestore(), 'characters', character.ID));
        charactersData.push({
          ...charSnap.data(),
          ID: charSnap.id,
          relX: character.relX,
          relY: character.relY,
        });
      }));
      setCharacters(charactersData);
    };
    fetchLevel();
  }, []);

  useEffect(() => {
    if (showDrawer) {
      const drawer = document.querySelector('.drawer-wrapper');
      drawer.style.setProperty('--posX', `${mouseCoords.x}px`);
      drawer.style.setProperty('--posY', `${mouseCoords.y}px`);
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
      {win && <LeaderboardModal time={time} />}
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
            <div key={character.ID} id={character.ID} className="found-marker" />
          ))}
          <img
            ref={levelImgRef}
            src={level.imageURL}
            alt=""
            onClick={() => { setShowDrawer(!showDrawer); }}
            onLoad={() => { setLoading(false); }}
            onMouseMove={handleMouseMove}
          />
        </div>
      </div>
    </div>
  );
}

Level.propTypes = {
  levelID: PropTypes.string.isRequired,
};

export default Level;
