import React, { useState, useRef } from "react";
import RichTextBox from "../components/Posts/Post/RichTextBox";
import { Jodit } from "jodit-react";

const Post = () => {
  const [image, setImage] = useState("");
  const categories = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const richTextBox = useRef<Jodit>(null);
  const onClick = () => {
    console.log(categories?.current?.value);
    console.log(tags?.current?.value);
    console.log(richTextBox?.current?.value);
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };
  return (
    <div className="lg:flex lg:justify-center lg:space-x-12 lg:flex-1 lg:items-start">
      <div className="flex  items-center justify-center mb-12 ">
        <div className="flex flex-1 justify-start items-start max-w-2xl bg-gray-100 p-6 pb-12">
          <div className="flex flex-col flex-1">
            <p>Content:</p>
            <RichTextBox height={400} ref={richTextBox} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-32">
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
            {image && <img alt="cover" src={image} />}
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className=" border border-gray-400 rounded-md"
              onChange={onImageChange}
            />
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
