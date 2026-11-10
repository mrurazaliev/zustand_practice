import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo{
    id:number,
    name:string,
    job:string
}

interface CounterState {
  
  todo:Todo[]
}

const initialState: CounterState = {
  todo:[
    {
        id:1,
        name:"SAnjar",
        job:"Student"

    },
      {
        id:2,
        name:"Jonibek",
        job:"frontend-developer"

    },  {
        id:3,
        name:"Muhammad",
        job:"Student"

    }
  ]
};

const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
 
  deleteUser:(state,action:PayloadAction<number>)=>{
    state.todo=state.todo.filter((e)=>e.id!==action.payload)
  },
   addUser:(state,action:PayloadAction<Todo>)=>{
    state.todo=[...state.todo,action.payload]
 },
 editUser:(state,action:PayloadAction<Todo>)=>{
 state.todo=state.todo.map((e)=>e.id===action.payload.id?action.payload:e)
},
  },

});

export const { deleteUser,addUser,editUser } =
  counterSlice.actions;

export default counterSlice.reducer;