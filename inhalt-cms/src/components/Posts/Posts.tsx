import { InfinitySpin } from "react-loader-spinner";
import CreateNewButton from "../Navbar/CreateNewButton";
import Pagination from "./Pagination";
import PostBox from "./Post/PostBox";
import { useFetchAllPostsQuery } from "../../redux/services/cmsCore";

import { Post as PostType, Posts as PostsType } from "../../redux/types";
import useQuery from "../../hooks/useQuery";

const ITEMS_PER_PAGE = 5;

const Posts = () => {
  const query = useQuery();
  const pageNum = parseInt(query.get("page_num") || "0");
  const { data, isLoading, isError } = useFetchAllPostsQuery(pageNum, {
    refetchOnMountOrArgChange: true,
  }) as {
    data: PostsType;
    isLoading: boolean;
    isError: boolean;
  };

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <InfinitySpin color="black" />
      </div>
    );
  } else if (isError) {
    content = <div>Something went wrong</div>;
  } else {
    if (data.totalItems === 0 && data.totalItems) {
      content = (
        <div className="space-y-9">
          <p>Nothing found! Create new Instead:</p>
          <CreateNewButton />
        </div>
      );
    } else {
      content = (
        <div className="flex flex-col space-y-9">
          {data.posts.map((post: PostType) => (
            <PostBox key={post._id} post={post} />
          ))}
          {data.totalItems >= ITEMS_PER_PAGE && (
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              dataLength={data.totalItems}
              forcePage={pageNum}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="flex items-center justify-center mb-32">
      <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-6 pb-12">
        <p className="text-2xl mb-12">Posts</p>
        {content}
      </div>
    </div>
  );
};

export default Posts;
