import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  name: string
  job: string
}

interface UserForm {
  name: string
  job: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6a56fde4b17de7bebbdeb233.mockapi.io/'
  }),

  tagTypes: ['Users'],

  endpoints: (builder) => ({

    getUsers: builder.query<User[], void>({
      query: () => 'data',
      providesTags: ['Users']
    }),

    addUser: builder.mutation<User, UserForm>({
      query: (newUser) => ({
        url: 'data',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['Users']
    }),

    editUser: builder.mutation<User, User>({
      query: (updatedUser) => ({
        url: `data/${updatedUser.id}`,
        method: 'PUT',
        body: {
          name: updatedUser.name,
          job: updatedUser.job
        }
      }),
      invalidatesTags: ['Users']
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `data/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })

  })
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation
} = usersApi