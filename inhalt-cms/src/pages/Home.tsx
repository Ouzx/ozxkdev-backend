import React from "react";
import Posts from "../components/Posts/Posts";
import useQuery from "../hooks/useQuery";
const Home = () => {
  const query = useQuery();
  const pageNum = query.get("page_num");
  var PN: number = +pageNum!;
  return (
    <>
      <Posts pageNum={PN} />
    </>
  );
};

export default Home;
