import { useEffect, useState } from "react";
import Posts from "../components/Posts/Posts";
import useQuery from "../hooks/useQuery";
import { useFetchAllPostsQuery } from "../redux/services/cmsCore";
import { PostQueryResult } from "../redux/types";

const Home = () => {
  const [title, setTitle] = useState("Latest Posts");
  const query = useQuery();
  const pageNum = parseInt(query.get("page_num") || "0");
  const postQueryResult = useFetchAllPostsQuery(pageNum, {
    refetchOnMountOrArgChange: true,
  }) as PostQueryResult;

  useEffect(() => {
    if (postQueryResult.data)
      setTitle(`Latest Posts (${postQueryResult.data.totalItems} posts found)`);
    document.title = "Inhalt CMS";
  }, [postQueryResult.data]);

  return (
    <Posts
      route="/"
      pageNum={pageNum}
      postQueryResult={postQueryResult}
      title={title}
    />
  );
};

export default Home;
