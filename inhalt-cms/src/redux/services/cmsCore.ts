import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  _id: string | null;
  title: string;
  content: string;
  category: string;
  tags: string[];
  img: string;
}

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
        url: "/posts",
        method: "PUT",
        body,
      }),
    }),
    fetchPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    fetchAllPosts: builder.query({
      query: () => "/posts",
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
