import React from "react";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/");
        navigate(0);
      }}
      className="font-sans text-xl hover:animate-pulse dark:text-white"
    >
      INHALT.
    </button>
  );
};

export default Logo;
