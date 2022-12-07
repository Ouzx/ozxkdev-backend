import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchPostsQuery } from "../redux/services/cmsCore";
import { PostQueryResult } from "../redux/types";
import Posts from "../components/Posts/Posts";
import useQuery from "../hooks/useQuery";

const Search = () => {
  const { searchValue } = useParams();
  const [title, setTitle] = useState(`Results for ${searchValue}`);
  const query = useQuery();
  const pageNum = parseInt(query.get("page_num") || "0");
  const postQueryResult = useSearchPostsQuery(`${searchValue}&${pageNum}`, {
    refetchOnMountOrArgChange: true,
  }) as PostQueryResult;
  useEffect(() => {
    if (postQueryResult.data)
      setTitle(
        `Results for ${searchValue} (${postQueryResult.data.totalItems} posts found)`
      );
  }, [postQueryResult.data]);

  return (
    <Posts
      route={`/search/${searchValue}`}
      pageNum={pageNum}
      postQueryResult={postQueryResult}
      title={title}
    />
  );
};

export default Search;
