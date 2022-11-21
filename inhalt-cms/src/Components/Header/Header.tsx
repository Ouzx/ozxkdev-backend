import React from "react";
import CreateNewButton from "./CreateNewButton";
import SearchButton from "./SearchButton";
const Header = () => {
  return (
    <div className="flex items-center justify-center drop-shadow-xl bg-white mb-32">
      <div className=" flex flex-1 justify-between items-center px-4 py-6 max-w-6xl ">
        <button
          onClick={() => {
            console.log("Logo clicked!");
          }}
          className="font-sans text-xl"
        >
          INHALT.
        </button>
        <SearchButton />
        <div className="flex items-center justify-center space-x-5">
          <button
            className="text-slate-800 hover:text-slate-900 hover:bg-slate-400 hover:bg-opacity-10 rounded-md px-2 py-1"
            onClick={() => {
              console.log("Posts Clicked!");
            }}
          >
            Posts
          </button>
          <CreateNewButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
