import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  description: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://to-dos-api.softclub.tj' 
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
   
    getUsers: builder.query<User[], void>({
      query: () => `/api/to-dos`,
      providesTags: ['User'],
    }),

    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/api/to-dos',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),

    editUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...updatedData }) => ({
        url: `/api/to-dos`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;