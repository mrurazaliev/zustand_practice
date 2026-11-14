import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, type Todo } from '../slice/counterSlice';
import { useFormik } from 'formik';
import { useState } from 'react';
import type { RootState } from '../store/store'; 
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormValues = {
  name:string,
  email: string
}

function About() {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.counter.users);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { 
      name:"",
      email: "",
    },
  })
  
 const onSubmit: SubmitHandler<FormValues> = (data) => {

  if(editingId===null){
    dispatch(editUser({
      id:editingId,
      name:data.name,
      email:data.email
    }))

  }
  else{
    dispatch(addUser({
    id:Date.now(),
    name:data.name,
    email:data.email
    }))
  }
  setOpen(false)
  setEditingId(null)
  reset()
}

  function handleClick(id: number) {
    dispatch(deleteUser(id));
  }
function handleOpenAdd() {
   setEditingId(null)
   reset({name:"",email:""})
   setOpen(true)
}

  function handleOpenEdit(e: Todo) {
    setEditingId(e.id);
    setValue('name':e.name)
    setValue('email':e.email)

    setOpen(true);
  }

 
  return (
    <div>
      <div>Users List</div>
      <button onClick={handleOpenAdd}>+add user</button>
      <div>
        {open && (
  <form onSubmit={handleSubmit(onSubmit)}>
     <label htmlFor="email">Name</label>
      <input
        id="name"
        type="name"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("name", { required: "Name is required" })}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button type="submit">Submit</button>
      <button type='button' onClick={()=>setOpen(false)}>cancel</button>
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

export default About;