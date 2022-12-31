import CreateNewButton from "./CreateNewButton";
import SearchButton from "./SearchButton";
import Logo from "./Logo";
import Logout from "./Logout";
import DarkModeToggle from "../DarkModeToggle";
const Navbar = () => {
  return (
    <nav
      className={
        "flex items-center justify-center drop-shadow-xl bg-white dark:bg-dblack  mb-32"
      }
    >
      <div className="flex flex-1 justify-between items-center px-4 py-6 max-w-6xl ">
        <Logo />
        <SearchButton />
        <DarkModeToggle />
        <CreateNewButton />
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
