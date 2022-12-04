import React from "react";
import Posts from "../components/Posts/Posts";
import useQuery from "../hooks/useQuery";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useFetchAllPostsQuery } from "../redux/services/cmsCore";
const Home = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFetchAllPostsQuery(null);
  console.log(data);
  const pageNum = query.get("page_num");
  var PN: number = +pageNum!;
  return (
    <>
      <Posts pageNum={PN} />
    </>
  );
};

export default Home;
