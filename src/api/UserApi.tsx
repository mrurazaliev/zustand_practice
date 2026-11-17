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
      query: () => `/api/categories`,
      providesTags: ['User'],
    }),

   
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/api/categories',
        method: 'POST',
        body: newUser, 
      }),
      invalidatesTags: ['User'],
    }),

 
    editUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...updatedData }) => ({
        url: `/api/categories`, 
        method: 'PUT',
        body: { id, ...updatedData },
      }),
      invalidatesTags: ['User'],
    }),

deleteUser: builder.mutation<void, User | { id: number }>({
      query: (userToDelete) => ({
        url: `/api/categories`,
        method: 'DELETE',
        body: userToDelete,
      }),
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