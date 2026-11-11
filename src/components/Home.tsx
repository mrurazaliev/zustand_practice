import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useEffect, useState, type FormEvent } from 'react'
import { addUser, deleteUser, editUser, getData } from '../slice/counterSlice'
function Home() {
  const { todo,isLoading,error } = useSelector(
    (state: RootState) => state.counter
  )
const dispatch=useDispatch()

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [editId,setEditId]=useState<number|null>(null)
const [open,setOpen]=useState(false)

useEffect(()=>{
  dispatch(getData())
},[])

function hadleOpenAdd() {
  setName("")
  setEditId(null)
  setEmail("")
  setOpen(true)
}

function handleOpenEdit(e){
  setName(e.name)
  setEditId(e.id)
  setEmail(e.email)
  setOpen(true)
}

async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
   try {
        if(editId===null){
     await dispatch(addUser({
        id:Date.now(),
        name:name,
        email:email,
       status:false
      }))


    }
    else{
      await  dispatch(editUser({
        id:editId,
        name,
        email
      }))
    }
   setName("")
   setEmail("")
   setOpen(false)
   setEditId(null)
   } catch (error) {
    return  
   }

 }

  return (
    <div>
      <button onClick={hadleOpenAdd} disabled={isLoading}>+add user</button>.

      <div>
      {open && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={name} placeholder='Name' onChange={(e)=>setName(e.target.value)} id="" />
          <input type="text" name="email" value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)} id="" />
          <button type='submit'>{editId!==null? "Submit" : "Save"}</button>
          <button onClick={()=>setOpen(false)}>cancel</button>
        </form>
      )}
      </div>
      <p>{isLoading && ("Loading...")}</p>
      {todo.map((e) => (
        <div key={e.id}>
          <h2>{e.name}</h2>
          <p>{e.email}</p>
          <input
            type="checkbox"
            checked={e.status}
            readOnly
          />
          <button onClick={()=>dispatch(deleteUser(e.id))}>Delete</button>
          <button onClick={()=>handleOpenEdit(e)}>edit</button>
        </div>
      ))}
    </div>
  )
}

export default Home