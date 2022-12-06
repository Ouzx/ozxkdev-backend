import { useAppDispatch } from "../../redux/hooks";
import { setPost, PostAction, PostState } from "../../redux/features/postSlice";
import { useNavigate } from "react-router-dom";
const CreateNewButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = () => {
    navigate("/post");
    navigate(0);
    dispatch(
      setPost({
        postAction: PostAction.CREATE,
      } as PostState)
    );
  };
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center font-semibold text-sm align-middle text-slate-50 text-center bg-green-500 hover:bg-green-600 sm:w-24 sm:rounded-md w-8 h-8 rounded-full"
    >
      <p className="hidden sm:flex">Create New</p>
      <p className="sm:hidden font-bold text-xl ">+</p>
    </button>
  );
};

export default CreateNewButton;
