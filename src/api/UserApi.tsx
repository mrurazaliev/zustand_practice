import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  email: string;
  description?: string;
}


interface UsersResponse {
  data: User[];
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://to-dos-api.softclub.tj' 
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    
  
    getUsers: builder.query<UsersResponse, void>({
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
        body: { id, ...updatedData },
      }),
      invalidatesTags: ['User'],
    }),

deleteUser: builder.mutation<void, User | { id: number }>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: 'DELETE', }),
      invalidatesTags: ['User'],
    }),
  })
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;