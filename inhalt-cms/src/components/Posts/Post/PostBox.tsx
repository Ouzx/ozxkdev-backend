import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import {
  setPost,
  PostAction,
  PostState,
} from "../../../redux/features/postSlice";
import { Post } from "../../../redux/types";

const PostBox: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = () => {
    navigate("/post");
    navigate(0);
    dispatch(
      setPost({
        postAction: PostAction.UPDATE,
        post: post,
      } as PostState)
    );
  };

  // TODO: Add a short content section to Post Page
  const shortContent = () => {
    // post.content is a string of html
    // extract text from between html/p tags
    const content = post.content?.split("<p>").join("").split("</p>").join("");
    return content?.slice(0, 100);
  };

  return (
    <div className="max-w-md mx-auto md:max-h-48 bg-white hover:bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl md:min-w-full">
      <div className="md:flex">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-full min-w-[12rem] h-48 md:w-48 object-cover rounded-lg"
            alt="post"
            src="https://images.unsplash.com/photo-1668712841504-d392ff984d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          />
        </div>
        <div className="p-8">
          <div className="truncate block text-[21px] text-black font-semibold">
            {post.title}
          </div>

          <div className="mt-2 text-gray-500">{shortContent()} ...</div>
          <button onClick={onClick}>
            <p className="underline italic mt-4 text-lg leading-tight font-medium text-gray-500 hover:underline">
              Edit Post {`>`}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
