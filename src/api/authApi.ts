import { baseApi } from "@/redux/baseApi";
import type { ILoginData, ILoginRequest, IRegisterRequest } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginData, ILoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<ILoginData, IRegisterRequest>({
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
    resetPassword: builder.mutation<{ message: string }, { oldPassword: string; newPassword: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfile: builder.mutation<
      { message: string; user: { name: string; phoneNumber: string } },
      { name?: string; phoneNumber?: string }
    >({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useResetPasswordMutation, useRegisterMutation, useLogoutMutation, useUpdateProfileMutation } = authApi;
