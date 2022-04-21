import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LevelSidebar.css';

function LevelSidebar({ levels, onSelectLevel }) {
  const levelsContainerRef = useRef();

  const setActive = (levelID) => {
    levelsContainerRef.current.childNodes.forEach((level) => {
      level.classList.remove('active');
      if (level.id === levelID) level.classList.add('active');
    });
  };

  const handleSelectLevel = (e) => {
    onSelectLevel(e.target.id);
    setActive(e.target.id);
  };

  useEffect(() => {
    onSelectLevel(levelsContainerRef.current.childNodes[0].id);
    setActive(levelsContainerRef.current.childNodes[0].id);
  }, []);

  return (
    <div className="level-sidebar">
      <div className="heading">Levels</div>
      <div ref={levelsContainerRef} className="levels-container">
        {levels.map((level) => (
          <button
            key={level.ID}
            id={level.ID}
            type="button"
            className="level-item"
            onClick={handleSelectLevel}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
}

LevelSidebar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectLevel: PropTypes.func.isRequired,
};

export default LevelSidebar;
