import CreateNewButton from "./CreateNewButton";
import SearchButton from "./SearchButton";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-center drop-shadow-xl bg-white mb-32">
      <div className=" flex flex-1 justify-between items-center px-4 py-6 max-w-6xl ">
        <Logo />
        <SearchButton />
        <CreateNewButton />
      </div>
    </nav>
  );
};

export default Navbar;
