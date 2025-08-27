import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "@/types/parcel";
import type { IUserRegister, IUserUpdateRequest } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ ADMIN: Get all users with pagination and filters
    getUsers: builder.query<IApiResponse<IUserRegister[]>, { page: number; limit: number; searchTerm?: string; role?: string }>({
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
          ? [...result.data.map(({ _id }) => ({ type: 'User' as const, id: _id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // SENDER: Get all receivers to select from
    getReceivers: builder.query<IApiResponse<IUserRegister[]>, void>({
      query: () => ({ url: "/users/receivers", method: "GET" }),
    }),

    // ADMIN: Get a single user by ID
    getUserById: builder.query<IApiResponse<IUserRegister>, string>({
      query: (id) => ({ url: `/users/${id}`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    // ADMIN: Update a user's status (block/unblock)
    updateUser: builder.mutation<IApiResponse<IUserRegister>, Partial<IUserUpdateRequest>>({
      query: (data) => ({ 
        url: `/users/${data.id}`,   // <-- change here
        method: "PATCH",
        body: { isBlocked: data.isBlocked } 
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetReceiversQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;