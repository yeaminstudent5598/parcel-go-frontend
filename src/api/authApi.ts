import { baseApi } from "@/redux/baseApi";
import type { ILoginRequest, ILoginResponse, IRegisterRequest } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<ILoginResponse, IRegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
