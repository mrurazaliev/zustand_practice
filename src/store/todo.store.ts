import { create } from 'zustand'

interface Todo {
  id: number
  age: number
}

interface TodoStore {
  users: Todo[]
  deleteUser: (id: number) => void
  addUser: (newUser: Todo) => void
  editUser:(editedUser:Todo)=>void
}

export const useUserStore = create<TodoStore>()((set) => ({
  users: [
    { id: 1, age: 19 },
    { id: 2, age: 21 },
    { id: 3, age: 20 }
  ],

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    }))
  },

  addUser: (newUser) => {
    set((state) => ({
      users: [...state.users, newUser]
    }))
  },
    editUser: (editedUser) => {
    set((state) => ({
      users:  state.users.map((e)=>e.id===editedUser.id?editedUser:e)
    }))
  }
}))