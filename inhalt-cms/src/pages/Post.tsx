import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import InputBox from "../components/InputBox";

import useQuery from "../hooks/useQuery";

import { Post as PostType, PostActionTypes } from "../redux/types";
import {
  useCreatePostMutation,
  useFetchPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../redux/services/cmsCore";
import LoadIngdicator from "../components/LoadIngdicator";
import Editor from "../components/Editor/Editor";
import { Toggle } from "../components/Switch";

// TODO: Change loading indicator
const Post = () => {
  const navigate = useNavigate();
  const query = useQuery();

  // For fetching the post if the action type is edit
  const actionType = query.get("action");
  const id = query.get("id");
  const { data: postData, isError: isErrorFetch } = useFetchPostQuery(id) as {
    data: PostType;
    isError: boolean;
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

  const [categoryInput, setCategoryInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [richContent, setRichContent] = useState("");
  const [isShared, setIsShared] = useState(true);

  const editor = useRef<any>(null);
  const categories = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const toggle = useRef<HTMLInputElement>(null);

  const isLoading = isLoadingCreate || isLoadingUpdate;
  const isError = isErrorCreate || isErrorUpdate;
  const isSuccess = isSuccessCreate || isSuccessUpdate || isSuccessDelete;
  const isEdit = actionType === PostActionTypes.EDIT.toString();

  useEffect(() => {
    if (isEdit) {
      if (postData === undefined) return;
      setCategoryInput(postData.category || "");
      setTagsInput(postData.tags?.join(",") || "");
      setRichContent(postData.raw || "");
      if (postData.shared !== undefined) setIsShared(postData.shared);
      else console.log("Shared is undefined");
      document.title = `Edit Post | ${postData.title}`;
    }
  }, [postData]);

  // For preventing the user from navigating away from the page when the post is being created or updated // bad-state management
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  const onClick = () => {
    if (
      !categories?.current?.value ||
      !tags?.current?.value ||
      !editor?.current?.title
    ) {
      toastMsg();
      return;
    }

    const currentPostData = {
      title: editor?.current?.title,
      content: editor?.current?.content,
      category: categories.current?.value,
      tags: tags.current?.value.split(","),
      thumbnail: editor?.current?.thumbnail,
      raw: editor?.current?.raw,
      shared: toggle.current?.checked,
      urlSuffix: editor?.current?.urlSuffix,
      shortContent: editor?.current?.shortContent,
      _id: id || "",
    } as PostType;

    if (actionType === PostActionTypes.EDIT.toString())
      return updatePost(currentPostData);

    createPost(currentPostData);
  };

  const buttonContent = () => {
    if (isEdit) {
      if (isLoading) return "Updating...";
      if (isError) return "Something went wrong";
      return "Update";
    } else {
      if (isLoading) return "Creating...";
      if (isError) return "Something went wrong";
      return "Create";
    }
  };

  const deleteContent = () => {
    if (isLoadingDelete) return "Deleting...";
    if (isErrorDelete) return "Something went wrong";
    return "Delete";
  };

  const toastMsg = () =>
    toast.error("🦄 Fill all fields!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  let content = () => {
    if (isEdit) {
      if (isErrorFetch) return <p>Something went wrong</p>;
      if (!postData) return <LoadIngdicator />;
    }
    return (
      <div className="lg:flex lg:justify-center lg:space-x-12 lg:px-12 lg:flex-1 lg:items-start">
        <div className="flex border lg:w-full items-center justify-center mb-12 ">
          <div className="flex flex-1 justify-start items-start dark:bg-dblackOver dark:text-white bg-gray-100 p-6 pb-12">
            <div className="flex flex-col flex-1">
              <p>Content:</p>
              <div className="flex justify-center">
                <Editor ref={editor} content={richContent} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-32 border">
          <div className="flex flex-col flex-1 justify-start items-start max-w-2xl bg-gray-100 dark:bg-dblackOver dark:text-white p-6 pb-12 lg:w-80 space-y-3  ">
            <InputBox
              value={categoryInput}
              ref={categories}
              title="Categories:"
            />
            <InputBox value={tagsInput} ref={tags} title="Tags:" />
            <Toggle enabled={isShared} ref={toggle} />
            <div>
              <button
                onClick={onClick}
                className="w-24 h-9 bg-purple-700 rounded-md text-white mr-3"
              >
                {buttonContent()}
              </button>
              {isEdit && (
                <button
                  onClick={() => deletePost(id)}
                  className=" text-red-500 underline"
                >
                  {deleteContent()}
                </button>
              )}
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </div>
      </div>
    );
  };

  return content();
};

export default Post;
