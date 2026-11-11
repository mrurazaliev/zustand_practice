import { getData } from './counterSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  todo: [ ],
  isLoading:false,
  error:null
}
const api = 'https://6a56fde4b17de7bebbdeb233.mockapi.io/data'

export const getData=createAsyncThunk("counter/getData",
  async()=>{
   const {data}=await axios.get(api)
   return data
  }
)
//delete
export const deleteUser=createAsyncThunk("counter/deleteUser",
  async(id)=>{
    await axios.delete(api+"/"+id)
  }
)
//edit
export const editUser=createAsyncThunk("counter/editUser",
  async(editedUser)=>{
    const data = await axios.put(`${api}/${editUser.id}`,editUser)
     return data
  }
)
//add
export const addUser=createAsyncThunk("counter/addUser",
  async(newUser)=>{
    await axios.post(api,newUser)
  }
)
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
   builder
   .addCase(getData.pending,(state)=>{
    state.isLoading=true
    state.error=null
   })
   .addCase(getData.fulfilled,(state,action)=>{
    state.isLoading=false
    state.todo=action.payload
   })
   .addCase(getData.rejected,(state,action)=>{
    state.isLoading=false
    state.error=action.error.message??"error"
   })
   .addCase(editUser.pending,(state)=>{
    state.isLoading=true
    state.error=null
   })
   .addCase(editUser.fulfilled,(state,action)=>{
    state.isLoading=false
    state.todo=state.todo.map((e)=>e.id===action.payload.id?{...e,...action.payload}:e)
   })
   .addCase(editUser.rejected,(state,action)=>{
    state.isLoading=false
    state.error.action.error.message??"error"
   })
   .addCase(addUser.pending,(state)=>{
   state.isLoading=true
   state.error=null
   })
   .addCase(addUser.fulfilled,(state,action)=>{
    state.isLoading=false
    state.todo=[...state.todo,action.payload]
   })
   .addCase(addUser.rejected,(state,action)=>{
    state.isLoading=false
    state.error=action.error.message??"error"
   })
  }
})
export default counterSlice.reducer