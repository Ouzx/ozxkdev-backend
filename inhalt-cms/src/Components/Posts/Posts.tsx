import { useState } from "react";
import CreateNewButton from "../Header/CreateNewButton";
import PostBox from "./Post/PostBox";

const Posts = () => {
  const [posts, setPosts] = useState(["a", "b", "c", "d", "e", "f", "g", "h"]);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-6 ">
        <p className="text-2xl mb-12">Posts</p>

        {/* Posts */}
        {posts.length <= 0 ? (
          <div className="space-y-9">
            <p>Nothing found! Create new Instead</p>
            <CreateNewButton />
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostBox key={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
      </div>
    </div>
  );
};

export default Posts;
