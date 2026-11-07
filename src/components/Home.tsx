import { useState, type FormEvent } from 'react'
import { useTodo, type Todo } from '../store/todo.store'

function Home() {
  
  const { todos, deleteUser,addUser,editUser } = useTodo()

  const [open,setOpen]=useState(false)
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [editId,setEditId]=useState<number|null>(null)

function handleOpenAdd(){
  setName("")
  setAge("")
  setEditId(null)
  setOpen(true)
}
 
function handleEdit(elem:Todo) {
  setName(elem.name)
  setAge(String(elem.age))
  setEditId(elem.id)
  setOpen(true)
}

function handleDelete(id:number) {
  deleteUser(id)

}


  function handleSave(e: FormEvent<HTMLFormElement>){
  e.preventDefault()

const userAge=Number(age)

if (!name.trim() || !Number.isInteger(userAge) || userAge <= 0) {
  return
}

    if (editId !== null) {
      editUser({
        id: editId,
        name: name.trim(),
        age: userAge,
      })
    } else {
      addUser({
        id: Date.now(),
        name: name.trim(),
        age: userAge,
      })
    }

    setName('')
    setAge('')
    setEditId(null)
    setOpen(false)
  }


  

  return (
    <div>
      <h1>Users</h1>

      <button onClick={handleOpenAdd}>+add user</button>
       
       {open&&(
         <form onSubmit={handleSave}>
           <h2>{editId !== null ? 'Edit user' : 'Add user'}</h2>
           <input type="text" name="name" value={name} placeholder='Namee' required onChange={(e)=>setName(e.target.value)} id="" /> 
           <input type="text" name="age" value={age} placeholder='Agee' onChange={(e)=>setAge(e.target.value) } id="" />    
           <button type='submit'>Save</button>
           <button onClick={()=>setOpen(false)}>Cancel</button>
       </form>
       )}

      {todos.length === 0 && <p>Список пуст</p>}

      {todos.map((elem) => (
        <div key={elem.id}>
          <h2>{elem.name}</h2>
          <p>{elem.age}</p>
        <button onClick={() => handleDelete(elem.id)}> Delete </button>
        <button onClick={()=>handleEdit(elem)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default Home