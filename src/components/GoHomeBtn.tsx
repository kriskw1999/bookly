import React, { useCallback } from "react";
import arrowSVG from "../assets/back-arrow.svg";
import { useHistory } from "react-router-dom";

const GoHomeBtn: React.FC = () => {
  const history = useHistory();
  const goHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <button className="go-home" onClick={goHome}>
      <img src={arrowSVG} alt="arrow indicating left direction" />
      Go Back
    </button>
  );
};

export default GoHomeBtn;
