import React, { useState } from "react";
import CreatePost from "../components/Posts/Post/CreatePost";

const Post = () => {
  return (
    <div className="lg:flex lg:flex-row lg:justify-center lg:space-x-12 lg:flex-1 lg:items-start">
      <div className="flex flex-col items-center justify-center mb-12 ">
        {/* Rich Part Component */}
        <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-6 pb-12">
          <div>
            <p className="text-lg mt-6 mb-2 font-bold underline">Content:</p>
            <CreatePost />
          </div>
        </div>
        {/* End Rich Part Component */}
      </div>
      <div className="flex items-center justify-center mb-32">
        <div className="flex flex-col flex-1 justify-start max-w-2xl bg-gray-100 p-6 pb-12">
          <div className="w-36 h-36 bg-black"></div>
          <div className="w-36 h-36 bg-black"></div>
          <div className="w-36 h-36 bg-black"></div>
          <div className="w-36 h-36 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
