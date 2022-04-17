import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import LevelHeader from '../../LevelHeader/LevelHeader';

function Level({ levelID }) {
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState({});
  // const handleClick = async (e) => {
  //   const imgRect = e.target.getBoundingClientRect();
  //   const relX = ((e.clientX - imgRect.left) / imgRect.width);
  //   const relY = ((e.clientY - imgRect.top) / imgRect.height);
  //   console.log(relX, relY);
  // };

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
    setLevel({ ID: levelSnap.id, name: levelData.name, imageURL: levelData.imageURL });

    const charactersData = await fetchCharacters(levelData.characters);
    setCharacters(charactersData);
  };

  useEffect(() => {
    fetchLevel();
  }, []);

  return (
    <div>
      <LevelHeader name={level.name} characters={characters} />
      <img src={level.imageURL} alt="" />
    </div>
  );
}

Level.propTypes = {
  levelID: PropTypes.string.isRequired,
};

export default Level;
