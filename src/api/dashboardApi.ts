import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "@/types/parcel";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // For Admin: Get overview stats
    getAdminStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/admin',
        providesTags: ['Parcel', 'User'],
    }),
    
    // For Sender: Get overview stats
    getSenderStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/sender',
        providesTags: ['Parcel'],
    }),

    // For Receiver: Get overview stats
    getReceiverStats: builder.query<IApiResponse<any>, void>({
        query: () => '/dashboard/stats/receiver',
        providesTags: ['Parcel'],
    }),

    // For Admin Chart: Get monthly parcel trends
    getAdminMonthlyTrends: builder.query<IApiResponse<any[]>, void>({
        query: () => '/dashboard/trends/admin',
        providesTags: ['Parcel'],
    }),

  }),
});

export const {
  useGetAdminStatsQuery,
  useGetSenderStatsQuery,
  useGetReceiverStatsQuery,
  useGetAdminMonthlyTrendsQuery,
} = dashboardApi;