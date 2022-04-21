/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LevelSidebar from '../../LevelSidebar/LevelSidebar';
import './Leaderboard.css';
import { getFormattedTime } from '../../../utils';

// eslint-disable-next-line react/prop-types
function Leaderboard({ levels }) {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState(null);
  const [level, setLevel] = useState({});

  const handleSelectLevel = async (levelID) => {
    const selectedLevel = levels.find((lvl) => lvl.ID === levelID);
    setLevel(selectedLevel);
    const leaderboardSnap = await getDoc(doc(getFirestore(), 'leaderboards', selectedLevel.leaderboardID));
    setLeaderboard(leaderboardSnap.data());
  };

  const compare = (entryA, entryB) => entryA.time - entryB.time;

  return (
    <div className="leaderboard-page">
      <LevelSidebar levels={levels} onSelectLevel={handleSelectLevel} />
      <button type="button" className="return-home" onClick={() => { navigate('../'); }}>
        Return to Home
      </button>
      {leaderboard && (
      <div className="leaderboard-content">
        <div className="hero">
          <img src={level.imageURL} alt="" />
          <div className="heading">{level.name}</div>
        </div>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank#</th>
              <th>Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.entries.sort(compare).map((entry, index) => (
              <tr>
                <td className="entry-index">{index + 1}</td>
                <td className="entry-name">{entry.name}</td>
                <td className="entry-time">{getFormattedTime(entry.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default Leaderboard;
