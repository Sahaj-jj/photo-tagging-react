/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './App.css';
import initializeFirebaseApp from './firebase';
import Level from './components/pages/Level/Level';

function App() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    initializeFirebaseApp();
    const fetchLevels = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), 'levels'));
      querySnapshot.forEach((doc) => {
        setLevels(levels.concat({ ...doc.data(), ID: doc.id }));
      });
    };
    fetchLevels();
  }, []);

  return (
    <div>
      {levels.length && levels.map((level) => <Level levelID={level.ID} />)}
    </div>
  );
}

export default App;
