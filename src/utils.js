const isInBounds = (pointA, pointB, radius) => radius
  > Math.sqrt(
    (pointA.x - pointB.x) ** 2
    + (pointA.y - pointB.y) ** 2,
  );

const getFormattedTime = (totalSeconds) => {
  const secondsValue = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  const minutesValue = Math.floor((totalSeconds % (60 * 60)) / 60).toString().padStart(2, '0');
  const hoursValue = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, '0');
  return (`${hoursValue}:${minutesValue}:${secondsValue}`);
};

export { isInBounds, getFormattedTime };
