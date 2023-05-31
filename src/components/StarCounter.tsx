import React from "react";
import starSVG from "../assets/star.svg";

type Props = {
  count: number;
};

const StarCounter: React.FC<Props> = ({ count }) => {
  const stars = Math.round(count);

  return (
    <div className="stars-container">
      {Array.from({ length: stars }, (_, i) => (
        <img
          src={starSVG}
          key={i}
          className="star"
          alt="icon representing a star"
        />
      ))}
    </div>
  );
};

export default StarCounter;
