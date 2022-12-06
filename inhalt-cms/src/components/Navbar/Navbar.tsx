import React from "react";
import CreateNewButton from "./CreateNewButton";
import SearchButton from "./SearchButton";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-center drop-shadow-xl bg-white mb-32">
      <div className=" flex flex-1 justify-between items-center px-4 py-6 max-w-6xl ">
        <button
          onClick={() => {
            navigate("/");
            navigate(0);
          }}
          className="font-sans text-xl"
        >
          INHALT.
        </button>
        <SearchButton />
        <div className="flex items-center justify-center space-x-5">
          <CreateNewButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;