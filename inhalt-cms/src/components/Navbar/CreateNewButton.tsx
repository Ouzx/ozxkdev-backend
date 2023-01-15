import { useNavigate } from "react-router-dom";
import { PostActionTypes } from "../../redux/types";

const CreateNewButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post?action=${PostActionTypes.CREATE}`);
    // navigate(0);
  };
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center font-semibold text-sm align-middle text-slate-50 text-center dark:bg-purple-700 dark:hover:bg-purple-800  bg-purple-500 hover:bg-purple-600 sm:w-24 sm:rounded-md w-8 h-8 rounded-full"
    >
      <p className="hidden sm:flex">Create New</p>
      <p className="sm:hidden font-bold text-xl ">+</p>
    </button>
  );
};

export default CreateNewButton;
