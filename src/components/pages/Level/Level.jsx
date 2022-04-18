/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import LevelHeader from '../../LevelHeader/LevelHeader';
import './Level.css';

function Level({ levelID }) {
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClick = async (e) => {
    setShowDrawer(!showDrawer);
    const imgRect = e.target.getBoundingClientRect();
    const relX = ((e.clientX - imgRect.left) / imgRect.width);
    const relY = ((e.clientY - imgRect.top) / imgRect.height);

    const marker = document.querySelector('.marker');
    marker.style.display = showDrawer ? 'block' : 'none';
    marker.style.setProperty('--posX', `${relX * imgRect.width}px`);
    marker.style.setProperty('--posY', `${relY * imgRect.height}px`);
  };

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
    setLevel({
      ID: levelSnap.id,
      name: `Level ${levelData.levelNumber} - ${levelData.location}`,
      imageURL: levelData.imageURL,
    });

    const charactersData = await fetchCharacters(levelData.characters);
    setCharacters(charactersData);
  };

  useEffect(() => {
    fetchLevel();
  }, []);

  return (
    <div className="level-wrapper">
      <LevelHeader name={level.name} characters={characters} />
      <div className="level-content">
        <div className="marker" />
        <img src={level.imageURL} alt="" onClick={handleClick} />
      </div>
    </div>
  );
}

Level.propTypes = {
  levelID: PropTypes.string.isRequired,
};

export default Level;
