import React, { useState, useEffect, useRef } from "react";
import RichTextBox from "../components/Posts/Post/RichTextBox";
import { Jodit } from "jodit-react";

const Post = () => {
  const categories = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const richTextBox = useRef<Jodit>(null);
  const onClick = () => {
    console.log(categories?.current?.value);
    console.log(tags?.current?.value);
    console.log(richTextBox?.current?.value);
  };
  return (
    <div className="lg:flex lg:flex-row lg:justify-center lg:space-x-12 lg:flex-1 lg:items-start">
      <div className="flex flex-col items-center justify-center mb-12 ">
        {/* Rich Part Component */}
        <div className="flex flex-col flex-1 justify-start items-start max-w-2xl bg-gray-100 p-6 pb-12">
          <div>
            <p>Content:</p>
            <RichTextBox height={400} ref={richTextBox} />
          </div>
        </div>
        {/* End Rich Part Component */}
      </div>
      <div className="flex items-center justify-center mb-32">
        {/* TODO: Fix md - width */}
        <div className="flex flex-col flex-1 justify-start items-start max-w-2xl bg-gray-100 p-6 pb-12 lg:w-80 space-y-3  ">
          <div>
            <p>Categories:</p>
            <input
              ref={categories}
              className=" border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <p>Tags:</p>
            <input ref={tags} className=" border border-gray-400 rounded-md" />
          </div>
          <div>
            <p>Cover Image:</p>
            <input type="file" className=" border border-gray-400 rounded-md" />
            {/* TODO: Show uploaded image */}
          </div>
          <button
            onClick={onClick}
            className="lg:visible w-24 h-9 bg-purple-700 rounded-md text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
