import { create } from 'zustand'

export interface Todo {
  id: number
  name: string
  age: number
}

interface TodoState {
  todos: Todo[]
  cnt: number
  deleteUser: (id: number) => void
  addUser:(newUSer:Todo)=>void
  editUser:(updateUser:Todo)=>void
}

export const useTodo = create<TodoState>((set) => ({
  todos: [
    {
      id: 1,
      name: 'Muhammadali',
      age: 19,
    },
    {
      id: 2,
      name: 'Muhammad',
      age: 20,
    },
  ],

  cnt: 0,

  deleteUser: (id) =>
    set((state) => ({
      todos: state.todos.filter((e) => e.id !== id),
    })),
    addUser:(newUser)=>
  set((state)=>({
    todos:[...state.todos,newUser]
  })),
  editUser:(updateUser)=>
    set((state)=>({
        todos:state.todos.map((elem)=>elem.id===updateUser.id?updateUser:elem)
    }))
}))