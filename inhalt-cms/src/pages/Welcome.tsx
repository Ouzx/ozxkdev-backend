import React from "react";
import GithubLogo from "../assets/github-logo.svg";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
const Welcome = () => {
  return (
    <div
      className={`bg-contain max-w-xl min-h-screen mx-auto flex flex-col space-y-8 justify-center items-center `}
    >
      <h1 className="type-welcome text-8xl px-4 bg-white "></h1>
      <Link to={"/santaCruze"}>
        <button className="bg-black border rounded-lg min-w-[10em]  text-white px-6 py-2 flex justify-center items-center">
          <img className="mr-2 " src={Logo} alt="" width={27} />
          Login
        </button>
      </Link>
      <a href="https://github.com/Ouzx/inhalt-cms/">
        <button className="bg-black border text-white min-w-[10em] px-6 py-2 rounded-lg flex justify-center items-center">
          <img className="mr-2" src={GithubLogo} alt="" width={27} />
          Github
        </button>
      </a>
      <DarkModeToggle />
    </div>
  );
};

export default Welcome;
