import { useState, useEffect } from "react";
import CreateNewButton from "../Header/CreateNewButton";
import Pagination from "./Pagination";
import PostBox from "./Post/PostBox";

const ITEMS_PER_PAGE = 5;

const Posts: React.FC<{ pageNum: number }> = ({ pageNum }) => {
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);

  const [offset, setOffset] = useState(0);
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * ITEMS_PER_PAGE) % posts.length;
    setOffset(newOffset);
  };

  useEffect(() => {
    handlePageClick({ selected: pageNum });
  }, [pageNum]);

  return (
    <div className="flex items-center justify-center mb-32">
      <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-6 pb-12">
        <p className="text-2xl mb-12">Posts</p>
        {/* Posts */}
        {posts.length <= 0 ? (
          <div className="space-y-9">
            <p>Nothing found! Create new Instead:</p>
            <CreateNewButton />
          </div>
        ) : (
          <div className="space-y-9">
            {
              // fetch new posts from server
              posts.slice(offset, offset + ITEMS_PER_PAGE).map((post) => (
                <PostBox key={post} post={post} />
              ))
            }
          </div>
        )}

        {/* Pagination */}
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          dataLength={posts.length}
          forcePage={pageNum}
        />
      </div>
    </div>
  );
};

export default Posts;
