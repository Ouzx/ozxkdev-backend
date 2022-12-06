import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import RichTextBox from "../components/Posts/Post/RichTextBox";
import { Jodit } from "jodit-react";
import InputBox from "../components/Posts/Post/InputBox";

import useQuery from "../hooks/useQuery";

import { Post as PostType, PostActionTypes } from "../redux/types";
import {
  useCreatePostMutation,
  useFetchPostQuery,
} from "../redux/services/cmsCore";

const Post = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const actionType = query.get("action");
  if (actionType == PostActionTypes.EDIT.toString()) {
    const id = query.get("id");
    if (id) {
      const { data: post } = useFetchPostQuery(id);
      console.log(post);
    }
  }

  const [image, setImage] = useState("");
  const categories = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const richTextBox = useRef<Jodit>(null);

  const [createPost, { isLoading, isError, isSuccess }] =
    useCreatePostMutation();

  // if (postAction === PostAction.EDIT) {
  //   if (post) {
  //     title.current!.value = post.title || "";
  //     categories.current!.value = post.category || "";
  //     tags.current!.value = post.tags?.join(",") || "";
  //     richTextBox.current!.value = post.content || "";
  //     setImage(post.coverImage || "");
  //   }
  // }

  const onClick = () => {
    if (
      !title?.current?.value ||
      !categories?.current?.value ||
      !tags?.current?.value ||
      !richTextBox?.current?.value
    )
      return;

    const newPost: PostType = {
      title: title.current?.value,
      content: richTextBox.current?.value,
      category: categories.current?.value,
      tags: tags.current?.value.split(","),
      coverImage: image,
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
    };

    createPost(newPost);
  };

  const buttonContent = () => {
    if (isLoading) return "Loading...";
    if (isError) return "Something went wrong";
    if (isSuccess) {
      navigate("/");

      return "Created!";
    }
    return "Create";
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };
  return (
    <div className="lg:flex lg:justify-center lg:space-x-12 lg:px-12 lg:flex-1 lg:items-start">
      <div className="flex border lg:w-full items-center justify-center mb-12 ">
        <div className="flex flex-1 justify-start items-start   bg-gray-100 p-6 pb-12">
          <div className="flex flex-col flex-1">
            <p>Content:</p>
            <RichTextBox height={400} ref={richTextBox} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-32">
        <div className="flex flex-col flex-1 justify-start items-start max-w-2xl bg-gray-100 p-6 pb-12 lg:w-80 space-y-3  ">
          <InputBox ref={title} title="Title:" />
          <InputBox ref={categories} title="Categories:" />
          <InputBox ref={tags} title="Tags:" />
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
            {buttonContent()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
