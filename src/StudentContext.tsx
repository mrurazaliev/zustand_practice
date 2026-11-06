import { createContext, useContext } from "react"

export type Actions=
| {type:"post",payload:Student}
| {type: "delete",payload:number}
| {type:"put",payload:Student}

 export type Student={
    id:number,
    name:string,
    age:number,
    score:number
}

 export type StudentContextType={
    students:Student[],
    dispatch:React.Dispatch<Actions>
}

export const StudentContext=createContext<StudentContextType | null>(null)

export  const initialState:Student[]=[
    {id:1,name:"Jurabek",age:20,score:90},
    {id:2,name:"Jahongir",age:21,score:85},
    {id:3,name:"Muhammadali",age:22,score:80}
]

 export function StudentReducer(state:Student[],action:Actions):Student[]{
    switch(action.type){
        case "post":
            return [...state,action.payload]
            case "delete":
                return state.filter((elem)=>elem.id!==action.payload)
                case "put":
                    return state.map((elem)=>elem.id===action.payload.id?action.payload:elem)
    }
    return state
}
 
export function useStudent(){
    const context=useContext(StudentContext)
    if(!context){
        throw new Error("useStudent must be used within a StudentProvider")
    }
    return context
}
export default StudentContext