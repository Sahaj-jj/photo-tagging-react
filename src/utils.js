const isInBounds = (pointA, pointB, radius) => radius
  >= Math.sqrt(
    (pointA.x - pointB.x) ** 2
    + (pointA.y - pointB.y) ** 2,
  );

export default isInBounds;
