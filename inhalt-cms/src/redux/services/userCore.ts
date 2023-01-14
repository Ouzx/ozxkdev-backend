import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthLoginRequest, AuthLoginResponse } from "../types";

export const userCoreApi = createApi({
  reducerPath: "userCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + "/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: AuthLoginRequest) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    validateToken: builder.query({
      query: (token: string) => ({
        url: "/validate-token",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyValidateTokenQuery } = userCoreApi;
