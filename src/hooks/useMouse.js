import { useState } from 'react';

const useMouse = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    e.persist();
    const imgRect = e.target.getBoundingClientRect();
    setCoords((prevCoords) => (
      { ...prevCoords, x: e.clientX - imgRect.left, y: e.clientY - imgRect.top }));
  };

  return [coords, handleMouseMove];
};

export default useMouse;
