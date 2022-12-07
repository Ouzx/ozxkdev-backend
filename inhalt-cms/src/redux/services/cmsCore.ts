import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Posts } from "../types";

export const cmsCoreApi = createApi({
  reducerPath: "cmsCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body: Post) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
    updatePost: builder.mutation({
      query: (body: Post) => ({
        url: `/posts/${body._id}`,
        method: "PATCH",
        body,
      }),
    }),
    fetchPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    fetchAllPosts: builder.query({
      query: (id) => `/posts/page/${id}`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useFetchPostQuery,
  useFetchAllPostsQuery,
} = cmsCoreApi;
