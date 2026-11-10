import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { addUSer, deleteUser, editUser, type Todo } from '../slice/counterSlice'
import { useState, type FormEvent } from 'react'

function Home() {
  const dispatch=useDispatch()
  
  const data=useSelector((state:RootState)=>state.Todochka.todo)

  const [name,setName]=useState("")
  const [job,setJob]=useState("")
  const [editId,setEditId]=useState<null|number>(null)
  const [open,setOpen]=useState(false)


 function handleDelete(id:number) {
 dispatch( deleteUser(id))
 }

 function handleOpenAdd() {
  setName("")
  setEditId(null)
  setJob("")
  setOpen(true)
 }
 function hadleOpenEdit(e:Todo) {
   setName(e.name)
  setEditId(e.id)
  setJob(e.job)
  setOpen(true)
 }

 function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(editId!==null){
      dispatch(editUser({
        id:editId,
        name:name,
        job:job
      }))
    }
    else{
      dispatch(addUSer({
        id:Date.now(),
        name:name,
        job:job
      }))

    }
    setEditId(null)
    setJob("")
    setName("")
    setOpen(false)
 }

  return (

    <div>
      <button onClick={handleOpenAdd}>+add user</button>
      <h1>Users list</h1>
      
       <div>
{open && (<form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} id="" />
          <input type="text" name="job" placeholder='Job' value={job} onChange={(e)=>setJob(e.target.value)} id="" />
          <button type='submit'>{editId===null?"Submit":"Save changes"}</button>
          <button onClick={()=>setOpen(false)}>Cancel</button>
        </form>)}
       </div>

      {
        data.map((e)=>{
          return(
            <div key={e.id}>
              <h2>{e.name}</h2>
              <p>{e.job}</p>
              <button onClick={()=>handleDelete(e.id)}>Delete</button>
              <button onClick={()=>hadleOpenEdit(e)}>Edit</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home