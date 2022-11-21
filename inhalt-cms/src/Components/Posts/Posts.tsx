import { useState } from "react";
import CreateNewButton from "../Header/CreateNewButton";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-3 ">
        <p className="text-2xl mb-12">Posts</p>
        {posts.length <= 0 && (
          <div className="space-y-9">
            <p>Nothing found! Create new Instead</p>
            <CreateNewButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
