import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthLoginRequest } from "../types";

export const userCoreApi = createApi({
  reducerPath: "userCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: AuthLoginRequest) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = userCoreApi;
