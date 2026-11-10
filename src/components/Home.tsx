import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { addUser, deleteUser, editUser, type Todo } from '../slice/counterSlice'
import { useState, type FormEvent} from 'react'

function Home() {
  const dispatch = useDispatch()

  const data = useSelector(
    (state: RootState) => state.counter.todo
  )

  const [open,setOpen]=useState(false)
  const [name,setName]=useState("")
  const [job,setJob]=useState("")
  const [editId,setEditId]=useState<number|null>(null)

function handleDelete(id:number) {
  dispatch(deleteUser(id))
}

function handleAdd() {
  setName("")
  setJob("")
  setEditId(null)
  setOpen(true)
}

function handleOpenEdit(e:Todo) {
 setName(e.name)
 setJob(e.job)
 setEditId(e.id)
 setOpen(true)  
}

function handleSave(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()

 

  if (editId !== null) {
    dispatch(editUser({
      id: editId,
      name: name.trim(),
      job: job.trim()
    }))
  } else {
    dispatch(addUser({
      id: Date.now(),
      name: name.trim(),
      job: job.trim()
    }))
  }

  setName('')
  setJob('')
  setEditId(null)
  setOpen(false)
}



  return (
   
<div className='flex justify-center items-center gap-5'>
  <h1>Todo List </h1>
  <button onClick={handleAdd}>+add user</button>

<div>
{ open && ( <form onSubmit={handleSave}>
    <input type="text" name="name" value={name} placeholder='Name' onChange={(e)=>setName(e.target.value)} id="" />
    <input type="text" name="job" value={job} placeholder='Job' onChange={(e)=>setJob(e.target.value)} id="" />
    <button  type='submit'>{editId!==null ? "Save changes" : "Submit"}</button>
    <button type='button' onClick={()=>setOpen(false)}>Cancel</button>
  </form>)
  }
</div>

        {data.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border p-5 shadow "
          >
            <h2 className="text-xl font-bold">
              {e.name}
            </h2>

            <p className="text-gray-500">
              {e.job}
            </p>
            <button onClick={()=>handleDelete(e.id)}>Delete</button>
            <button onClick={()=>handleOpenEdit(e)}>edit</button>
          </div>
        ))}

      </div>
   
  )
}

export default Home