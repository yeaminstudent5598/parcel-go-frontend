/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "@/types/parcel";
import type { IUser, IUserUpdateRequest } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ ADMIN: Get all users with pagination and filters
    getUsers: builder.query<IApiResponse<IUser[]>, { page: number; limit: number; searchTerm?: string; role?: string }>({
      query: ({ page, limit, searchTerm, role }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (role) params.append('role', role);
        return { url: `/users?${params.toString()}`, method: "GET" };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'User' as const, id: _id })),
              { type: 'User', id: 'LIST' }
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // SENDER: Get all receivers to select from
    getReceivers: builder.query<IApiResponse<IUser[]>, void>({
      query: () => ({ url: "/users/receivers", method: "GET" }),
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // ADMIN: Get a single user by ID
    getUserById: builder.query<IApiResponse<IUser>, string>({
      query: (id) => ({ url: `/users/${id}`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    // ADMIN: Update a user's status (block/unblock)
    updateUser: builder.mutation<IApiResponse<IUser>, Partial<IUserUpdateRequest>>({
      query: (data) => ({ 
        url: `/users/${data.id}`, 
        method: "PATCH",
        body: { isBlocked: data.isBlocked } 
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id }, 
        { type: 'User', id: 'LIST' }
      ],
    }),

    // ✅ সমাধান: Delete User মিউটেশন যোগ করা হয়েছে
    deleteUser: builder.mutation<IApiResponse<any>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

// ✅ সব হুক এক্সপোর্ট করা হয়েছে
export const {
  useGetUsersQuery,
  useGetReceiversQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation, // এখন এটি কাজ করবে
} = userApi;