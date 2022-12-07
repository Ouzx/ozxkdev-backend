import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RichTextBox from "../components/Posts/Post/RichTextBox";
import { Jodit } from "jodit-react";
import InputBox from "../components/Posts/Post/InputBox";

import useQuery from "../hooks/useQuery";

import { Post as PostType, PostActionTypes } from "../redux/types";
import {
  useCreatePostMutation,
  useFetchPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../redux/services/cmsCore";

const Post = () => {
  const navigate = useNavigate();
  const query = useQuery();

  // For fetching the post if the action type is edit
  const actionType = query.get("action");
  const id = query.get("id");
  const { data: postData } = useFetchPostQuery(id) as {
    data: PostType;
  };

  // For updating the post
  const [
    updatePost,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdatePostMutation();

  // For creating the post
  const [
    createPost,
    {
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
    },
  ] = useCreatePostMutation();

  // For deleting the post
  const [
    deletePost,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeletePostMutation();

  const [image, setImage] = useState("");
  const categories = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const richTextBox = useRef<Jodit>(null);

  const isLoading = isLoadingCreate || isLoadingUpdate;
  const isError = isErrorCreate || isErrorUpdate;
  const isSuccess = isSuccessCreate || isSuccessUpdate || isSuccessDelete;
  const isEdit = actionType === PostActionTypes.EDIT.toString();

  // I used useLayoutEffect because I want to set the values of the input boxes via refs
  useLayoutEffect(() => {
    if (isEdit) {
      if (postData) {
        title.current!.value = postData.title || "";
        categories.current!.value = postData.category || "";
        tags.current!.value = postData.tags?.join(",") || "";
        richTextBox.current!.value = postData.content || "";
        setImage(postData.coverImage || "");
      }
    }
  }, [postData]);

  // For preventing the user from navigating away from the page when the post is being created or updated // bad-state management
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  const onClick = () => {
    if (
      !title?.current?.value ||
      !categories?.current?.value ||
      !tags?.current?.value ||
      !richTextBox?.current?.value
    )
      return;

    if (actionType === PostActionTypes.EDIT.toString()) {
      const updatedPost: PostType = {
        title: title.current?.value,
        content: richTextBox.current?.value,
        category: categories.current?.value,
        tags: tags.current?.value.split(","),
        coverImage: image,
        _id: postData._id,
        createdAt: postData.createdAt,
        updatedAt: postData.updatedAt,
        __v: postData.__v,
      };

      updatePost(updatedPost);
      return;
    }

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
    if (isEdit) {
      if (isLoading) return "Updating...";
      if (isError) return "Something went wrong";
      return "Update";
    } else {
      if (isLoading) return "Creating...";
      if (isError) return "Something went wrong";
      return "Created!";
    }
  };

  const deleteContent = () => {
    if (isLoadingDelete) return "Deleting...";
    if (isErrorDelete) return "Something went wrong";
    return "Delete";
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
          <div>
            <button
              onClick={onClick}
              className="w-24 h-9 bg-purple-700 rounded-md text-white mr-3"
            >
              {buttonContent()}
            </button>
            {isEdit && (
              <button
                onClick={() => deletePost(postData._id)}
                className=" text-red-500 underline"
              >
                {deleteContent()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
