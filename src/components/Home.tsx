import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, type Todo } from '../slice/counterSlice';
import { useFormik } from 'formik';
import { useState } from 'react';
import type { RootState } from '../store/store'; 

function Home() {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.counter.users);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: (values) => {
      if (editingId !== null) {
        dispatch(
          editUser({
            id: editingId,
            name: values.name,
            email: values.email,
      })
        );
      }
      else{
        dispatch(addUser({
          id:Date.now(),
          name:values.name,
          email:values.email
        }))
      }
      setOpen(false); 
      setEditingId(null);
    },
  });

  function handleClick(id: number) {
    dispatch(deleteUser(id));
  }
function handleOpenAdd() {
   setEditingId(null)
   formik.setValues({
    name:"",
    email:""
   })
   setOpen(true)
}

  function handleOpenEdit(e: Todo) {
    setEditingId(e.id);
    formik.setValues({
      name: e.name,
      email: e.email,
    });
    setOpen(true);
  }

  return (
    <div>
      <div>Users List</div>
      <button onClick={handleOpenAdd}>+add user</button>
      <div>
        {open && (
          <form onSubmit={formik.handleSubmit}>
           <div>
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name} 
                name="name"
              />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <button type="submit">Save</button>
           
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      {todo.map((e) => {
        return (
          <div key={e.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
            <h2>{e.name}</h2>
            <p>{e.email}</p>
            <button onClick={() => handleClick(e.id)}>Delete</button>
            <button onClick={() => handleOpenEdit(e)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}

export default Home; 