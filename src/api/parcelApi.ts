/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse, IParcel, IParcelCreateRequest, ParcelStatus } from "@/types/parcel";

interface ISuccessResponse {
  success: boolean;
  message: string;
}

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SENDER: Get their own parcels
    getMyParcels: builder.query<IApiResponse<IParcel[]>, { page: number; limit: number; searchTerm?: string; status?: string }>({
      query: ({ page, limit, searchTerm, status }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (status) params.append('status', status);
        return { url: `/parcels/my-parcels?${params.toString()}`, method: 'GET' };
      },
      providesTags: (result) => result?.data ? [...result.data.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })), { type: 'Parcel', id: 'LIST' }] : [{ type: 'Parcel', id: 'LIST' }],
    }),

    // RECEIVER: Get incoming parcels
    getIncomingParcels: builder.query<IApiResponse<IParcel[]>, void>({
      query: () => ({ url: '/parcels/incoming-parcels', method: 'GET' }),
      providesTags: (result) => result?.data ? [...result.data.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })), { type: 'Parcel', id: 'LIST' }] : [{ type: 'Parcel', id: 'LIST' }],
    }),

    // ✅ ADMIN: Get all parcels with pagination and filters
    getAllParcels: builder.query<IApiResponse<IParcel[]>, { page: number; limit: number; searchTerm?: string; status?: string }>({
      query: ({ page, limit, searchTerm, status }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (status) params.append('status', status);
        return { url: `/parcels?${params.toString()}`, method: 'GET' };
      },
      providesTags: (result) => result?.data ? [...result.data.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })), { type: 'Parcel', id: 'LIST' }] : [{ type: 'Parcel', id: 'LIST' }],
    }),

    // ✅ STATS: Hooks for all roles
    getAdminStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/admin',
        providesTags: ['Parcel', 'User'],
    }),
    getSenderStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/sender',
        providesTags: ['Parcel'],
    }),
    getReceiverStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/receiver',
        providesTags: ['Parcel'],
    }),

    // PUBLIC: Track parcel by tracking ID
    trackParcelById: builder.query<IApiResponse<IParcel>, string>({
      query: (trackingId) => ({ url: `/parcels/tracking/${trackingId}`, method: 'GET' }),
      providesTags: (result) => result?.data ? [{ type: 'Parcel', id: result.data._id }] : [],
    }),
    
    // Get a single parcel by its database ID
    getParcelById: builder.query<IApiResponse<IParcel>, string>({
      query: (id) => ({ url: `/parcels/${id}`, method: "GET" }),
      providesTags: (result) => result?.data ? [{ type: 'Parcel', id: result.data._id }] : [],
    }),

    // SENDER: Create a new parcel
    createParcel: builder.mutation<IApiResponse<IParcel>, Partial<IParcelCreateRequest>>({
      query: (data) => ({ url: "/parcels", method: "POST", body: data }),
      invalidatesTags: [{ type: 'Parcel', id: 'LIST' }],
    }),

    // SENDER: Cancel a parcel
    cancelParcel: builder.mutation<IApiResponse<IParcel>, string>({
      query: (id) => ({ url: `/parcels/cancel/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),
    
    // RECEIVER: Confirm parcel delivery
    confirmDelivery: builder.mutation<IApiResponse<IParcel>, string>({
      query: (id) => ({ url: `/parcels/confirm-delivery/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),

    // ADMIN: Update parcel status
    updateParcelStatus: builder.mutation<IApiResponse<IParcel>, { id: string; status: ParcelStatus }>({
      query: ({ id, status }) => ({
        url: `/parcels/update-status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),

    // ADMIN: Block a parcel
    blockParcel: builder.mutation<ISuccessResponse, string>({
      query: (id) => ({ url: `/parcels/block/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),

    // ADMIN: Unblock a parcel
    unblockParcel: builder.mutation<ISuccessResponse, string>({
      query: (id) => ({ url: `/parcels/unblock/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useGetAllParcelsQuery,
  useGetAdminStatsQuery,
  useGetSenderStatsQuery,
  useGetReceiverStatsQuery,
  useTrackParcelByIdQuery,
  useGetParcelByIdQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,
} = parcelApi;