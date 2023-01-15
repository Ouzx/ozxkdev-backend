import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
const Logo = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <button
      onClick={() => {
        if (user) navigate("/home");
        else navigate("/");
        // navigate(0);
      }}
      className="font-sans text-xl hover:animate-pulse dark:text-white"
    >
      INHALT.
    </button>
  );
};

export default Logo;
