/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import initializeFirebaseApp from './firebase';
import Home from './components/pages/Home/Home';
import Level from './components/pages/Level/Level';
import Leaderboard from './components/pages/Leaderboard/Leaderboard';

function App() {
  const [levels, setLevels] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async (collectionName) => {
    const querySnapshot = await getDocs(collection(getFirestore(), collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), ID: doc.id });
    });
    return data;
  };

  useEffect(() => {
    initializeFirebaseApp();
    const fetchLevels = async () => {
      const levelsData = await fetchCollection('levels');
      setLevels(levelsData);
    };

    const fetchCharacters = async () => {
      const charactersData = await fetchCollection('characters');
      setCharacters(charactersData);
      setLoading(false);
    };

    fetchLevels();
    fetchCharacters();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={!loading && <Home levels={levels} characters={characters} />} />
        <Route path="/levels/:levelID" element={<Level />} />
        <Route path="/leaderboards" element={<Leaderboard levels={levels} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
