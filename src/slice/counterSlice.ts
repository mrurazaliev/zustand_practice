import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Todo{
  id:number,
  name:string
}

const initialState = {
  users: [
    {
       id: 1,
       name: 'Muhammad'
     },
    { 
      id: 2,
      name: 'Ali'
     },
    { 
      id: 3,
       name: 'Vali' 
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
  state.users=state.users.map((e)=>e.id===action.payload)
},
}
})

export default counterSlice.reducer
export const { deleteUser,addUser,editUser } = counterSlice.actions