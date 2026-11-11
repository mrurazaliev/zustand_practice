import { useDispatch, useSelector } from 'react-redux'
import { useAtomValue, useSetAtom } from 'jotai'
import type { AppDispatch, RootState } from '../store/store'
import { addUser, deleteUser as deleteReduxUser, editUser } from '../slice/counterSlice'
import { useUserStore } from '../store/todo.store'
import { usersAtom, deleteUserAtom, addUserAtom, editUserAtom } from '../store/userAtoms'
import { useState, type FormEvent } from 'react'

interface newUSer{
  id: number
  name: string
  age: number
  avatar: string
}


function Home() {
  const dispatch = useDispatch<AppDispatch>()
  
  const zustandUsers = useUserStore((state) => state.users )
  const jotaiUsers = useAtomValue(usersAtom)
  const reduxUsers = useSelector((state: RootState) =>state.counter.users)


const [editId,setEditId]=useState<number|null>(null)
const [name,setName]=useState("")
const [age,setAge]=useState<number|null>(null)
const [avatar,setAvatar]=useState("")
const [open,setOpen]=useState(false)
const [search, setSearch] = useState('')

//zustand
  const deleteZustandUser = useUserStore((state) => state.deleteUser)
  const addZustandUSer=useUserStore((state)=>state.addUser)
  const editZustand=useUserStore((state)=>state.editUser)

  //jotai
  const deleteJotaiUser = useSetAtom(deleteUserAtom)
  const addJotai=useSetAtom(addUserAtom)
  const editJotai=useSetAtom(editUserAtom)

  
  
  const result = reduxUsers.map((user) => {
    const zustandUser = zustandUsers.find(
      (elem) => elem.id === user.id
    )
    
    const jotaiUser = jotaiUsers.find(
      (elem) => elem.id === user.id
    )
    
    return {
      id: user.id,
      name: user.name,
      age: zustandUser?.age,
      avatar: jotaiUser?.avatar
    }
  })
  

//delete all
  function handleDelete(id: number) {
    dispatch(deleteReduxUser(id))
    deleteZustandUser(id)
    deleteJotaiUser(id)
  }

// add modal opening
  function handleOpenAdd() {
    setEditId(null)
    setName("")
    setAge(null)
    setAvatar("")
    setOpen(true)
  }

//edit modal opening
   function handleOpenEdit(user:newUSer) {
    setEditId(user.id)
    setName(user.name)
    setAge(user.age)
    setAvatar(user.avatar)
    setOpen(true)
  }

//add all
  function handleAddAll(newUser: newUSer) {

  dispatch(addUser({
    id: newUser.id,
    name: newUser.name
  }))

  addJotai({
    id: newUser.id,
    avatar: newUser.avatar
  })

  addZustandUSer({
    id: newUser.id,
    age: newUser.age
  })
}


//edit all
function handleEditAll(editedUser:newUSer) {
  dispatch(editUser({
    id:editedUser.id,
    name:editedUser.name,
  }))
  editJotai({
    id:editedUser.id,
    avatar:editedUser.avatar
  })
  editZustand({
    id:editedUser.id,
    age:editedUser.age
  })
}

//submit
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()

  if (editId === null) {
    handleAddAll({
      id: Date.now(),
      avatar: avatar,
      name: name,
      age: age
    })

    setName('')
    setAvatar('')
    setAge(null)
    setOpen(false)
  }
  else{
    handleEditAll({
     id:editId,
     avatar:avatar,
     name:name.trim(),
     age:age
    })
  }
}

const filteredUsers = result.filter((user) =>
  user.name.toLowerCase().includes(search.trim().toLowerCase())
)

return (
  <div>
      <button onClick={handleOpenAdd}>+add user</button>
      <div>
  <input
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
    aria-label=""
  />

  <button type="button" onClick={() => setSearch('')}>
    Очистить
  </button>
</div>


      <div >
        {open && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="avatar" value={avatar} onChange={(e)=>setAvatar(e.target.value)} placeholder="URL:" id="" />
            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name:' id="" required />
            <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age:" min="0" required />
            <button type='submit'>Save</button>
            <button onClick={()=>setOpen(false)}>Cancel</button>
          </form>
        )}
      </div>
      {filteredUsers.map((user) => (
        <div key={user.id}>
        <img src={user.avatar} alt="" />
          <h2>{user.name}</h2>
          <p>Возраст: {user.age ?? 'Не указан'}</p>

          <button onClick={() => handleDelete(user.id)}>
            Delete
          </button>
          <button onClick={()=>handleOpenEdit(user)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default Home