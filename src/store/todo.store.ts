import { create } from "zustand";

export interface Todo{
    id:number,
    name:string,
    age:number
}
interface TodoState{
    todos:Todo[],
    deleteUser:(id:number)=>void
    editUser:(updatedUser:Todo)=>void
    addUser:(newUser:Todo)=>void
}

export const useTodo=create<TodoState>((set)=>({
    todos:[ 
    {
      id :1,
      name:"Muhammadali", 
      age:19
    },
       {
      id :2,
      name:"Jurabek", 
      age:21
    }, 
      {
      id :3,
      name:"Fasehuddin", 
      age:20
    }
],
deleteUser:(id:number)=>
    set((state)=>({
        todos:state.todos.filter((elem)=>elem.id!==id)
    })),
editUser:(updatedUser)=>
    set((state)=>({
        todos:state.todos.map((e)=>e.id===updatedUser.id?updatedUser:e)
    })),
 addUser:(newUSer)=>
    set((state)=>({
        todos:[...state.todos,newUSer]
    }))   ,
    
}))