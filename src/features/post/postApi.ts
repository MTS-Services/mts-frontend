import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      // Optional: polling
      // pollingInterval: 5000,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
