/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse, IParcel, IParcelCreateRequest, ParcelStatus } from "@/types/parcel";

interface ISuccessResponse {
  success: boolean;
  message: string;
}

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================================
    // PARCEL ENDPOINTS
    // ==========================================

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

    // ADMIN: Get all parcels with pagination and filters
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

    // PUBLIC: Track parcel by tracking ID
    trackParcelById: builder.query<IApiResponse<IParcel>, string>({
      query: (trackingId) => ({ url: `/parcels/tracking/${trackingId}`, method: 'GET' }),
      providesTags: (result) => result?.data ? [{ type: 'Parcel', id: result.data._id }] : [],
    }),

    // ২. লোকেশন আপডেট এন্ডপয়েন্ট (রাইডার বা ডেমো পারপাস)
    updateParcelLocation: builder.mutation<IApiResponse<IParcel>, { id: string, lat: number, lng: number }>({
      query: ({ id, ...location }) => ({
        url: `/parcels/update-location/${id}`,
        method: 'PATCH',
        body: location,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Parcel', id }],
    }),

    getActiveLocations: builder.query<IApiResponse<IParcel[]>, void>({
      query: () => ({ 
        url: '/parcels/active-locations', 
        method: 'GET' 
      }),
      providesTags: ['Parcel'],
    }),
    
    // Get a single parcel by database ID
    getParcelById: builder.query<IApiResponse<IParcel>, string>({
      query: (id) => ({ url: `/parcels/${id}`, method: "GET" }),
      providesTags: (result) => result?.data ? [{ type: 'Parcel', id: result.data._id }] : [],
    }),

    // SENDER: Create a new parcel (Payload now includes couponCode)
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

    // ADMIN: Block/Unblock a parcel
    blockParcel: builder.mutation<ISuccessResponse, string>({
      query: (id) => ({ url: `/parcels/block/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),

    unblockParcel: builder.mutation<ISuccessResponse, string>({
      query: (id) => ({ url: `/parcels/unblock/${id}`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Parcel', id }, { type: 'Parcel', id: 'LIST' }],
    }),

    // ==========================================
    // DASHBOARD STATS ENDPOINTS
    // ==========================================

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

    // ==========================================
    // COUPON ENDPOINTS (New Additions)
    // ==========================================

    // ADMIN: Get all coupons
    getAllCoupons: builder.query<IApiResponse<any[]>, void>({
      query: () => '/coupons',
      providesTags: ['Parcel'], 
    }),

    // ADMIN: Create new coupon
    createCoupon: builder.mutation<IApiResponse<any>, { code: string; discountAmount: number }>({
      query: (data) => ({ url: '/coupons', method: 'POST', body: data }),
      invalidatesTags: ['Parcel'],
    }),

    // SENDER: Validate a coupon code
    validateCoupon: builder.query<IApiResponse<any>, string>({
      query: (code) => ({
        url: `/coupons/validate/${code}`,
        method: 'GET',
      }),
    }),
  }),
});

// ✅ Export all hooks including the new coupon hooks
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
  // New Coupon Hooks
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useValidateCouponQuery,
  useLazyValidateCouponQuery,
  useUpdateParcelLocationMutation,
  useGetActiveLocationsQuery,
} = parcelApi;