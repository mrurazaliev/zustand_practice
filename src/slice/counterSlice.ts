import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { email } from 'zod'

export interface Todo{
  id:number,
  name:string,
  email:string
}

const initialState = {
  users: [
    {
       id: 1,
       name: 'Muhammad',
       email:"exampleemail@gmail.com"
     },
    { 
      id: 2,
      name: 'Ali',
       email:"exampleemail@gmail.com"
     },
    { 
      id: 3,
       name: 'Vali' ,
       email:"exampleemail@gmail.com"
      }
  ]
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
 reducers: {
  deleteUser: (state, action: PayloadAction<number>) => {
    state.users = state.users.filter(
      (user) => user.id !== action.payload
    )
  },
addUser: (state,action: PayloadAction<Todo>) => {
  state.users = [...state.users, action.payload]
},
editUser:(state,action:PayloadAction<Todo>)=>{
  state.users=state.users.map((e)=>e.id===action.payload?e:action.payload)
},
}
})

export default counterSlice.reducer
export const { deleteUser,addUser,editUser } = counterSlice.actions