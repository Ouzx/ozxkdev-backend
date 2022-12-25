import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Post } from "../types";

export const cmsCoreApi = createApi({
  reducerPath: "cmsCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/posts/",
    // add authorization header from local storage
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body: Post) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    updatePost: builder.mutation({
      query: (body: Post) => ({
        url: `/${body._id}`,
        method: "PATCH",
        body,
      }),
    }),
    fetchPost: builder.query({
      query: (id) => `/${id}`,
    }),
    fetchAllPosts: builder.query({
      query: (id) => `/page/${id}`,
    }),
    // with pagination
    searchPosts: builder.query({
      query: (searchTermWithPageIndex) => ({
        url: `/search/${searchTermWithPageIndex.split("&")[0]}/${
          searchTermWithPageIndex.split("&")[1]
        }`,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useFetchPostQuery,
  useFetchAllPostsQuery,
  useSearchPostsQuery,
} = cmsCoreApi;
