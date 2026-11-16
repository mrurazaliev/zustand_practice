import { createSlice } from "@reduxjs/toolkit"

export interface Todo{
  id:number,
  name:string,
  email:string
}

const initialState = {
  users: []
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
 reducers: {},
 
})

export default counterSlice.reducer