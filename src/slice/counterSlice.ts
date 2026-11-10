import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Todo{
    id:number,
    name:string,
    job:string
}

interface CounterState{
    todo:Todo[]
}

const initialState:CounterState={
todo:[
    {
        id:1,
        name:"Muhammad",
        job:"student"
    },
        {
        id:2,
        name:"Sanjar",
        job:"Builder"
    },
        {
        id:3,
        name:"Jonibek",
        job:"Developer"
    }
],
}

 const counterSlice=createSlice({
 name:"Todochka",
 initialState,

 reducers:{
  deleteUser:(state,action:PayloadAction<number>)=>{
    state.todo=state.todo.filter((e)=>e.id!==action.payload)
  },
  addUSer:(state,action:PayloadAction<Todo>)=>{
    state.todo.push(action.payload)
  },
  editUser:(state,action:PayloadAction<Todo>)=>{
    state.todo=state.todo.map((e)=>e.id===action.payload.id?action.payload:e)
  }
 }
})
export const {deleteUser,addUSer,editUser}=counterSlice.actions
export default counterSlice.reducer