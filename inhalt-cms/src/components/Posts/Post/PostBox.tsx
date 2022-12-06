import React from "react";
import { useNavigate } from "react-router-dom";
const PostBox: React.FC<{ post: string }> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto md:max-h-48 bg-white hover:bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
            {`Post ${post}`}
          </div>

          <p className="mt-2 text-gray-500">28.10.2021 12:00</p>
          <button
            onClick={() => {
              navigate(`/post/${2}`); // TODO: Change to post id
              navigate(0);
            }}
          >
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
