import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useUserStore, type Todo } from '../store/todo.store';

type FormValues = {
  name: string;
  description: string;
};

function About() {
  const { users, isLoading, isError, getUsers, addUser, editUser, deleteUser } = useUserStore();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (editingId !== null) {
      await editUser({
        id: editingId,
        name: data.name,
        description: data.description,
      });
    } else {
      await addUser({
        name: data.name,
        description: data.description,
      });
    }
    
    setOpen(false);
    setEditingId(null);
    reset();
  };

  function handleDelete(user: Todo) {
    deleteUser(user);
  }

  function handleOpenAdd() {
    setEditingId(null);
    reset({ name: '', description: '' });
    setOpen(true);
  }

  function handleOpenEdit(user: Todo) {
    setEditingId(user.id);
    setValue('name', user.name);
    setValue('description', user.description);
    setOpen(true);
  }

  if (isLoading) return <div className="p-5">Загрузка...</div>;
  if (isError) return <div className="p-5 text-red-500">Ошибка при загрузке данных</div>;

  return (
    <div className="p-5 max-w-[800px] mx-auto">
      <div className="text-xl font-bold mb-4">Users List</div>
      <button 
        onClick={handleOpenAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add user
      </button>

      <div>
        {open && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mb-6 p-4 border rounded bg-gray-50">
            <div>
              <label htmlFor="name" className="block font-medium">Name</label>
              <input
                id="name"
                type="text"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", { required: "Name is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.name && <p role="alert" className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block font-medium">Description</label>
              <input
                id="description"
                type="text"
                aria-invalid={errors.description ? "true" : "false"}
                {...register("description", { required: "Description is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.description && <p role="alert" className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
              <button type='button' onClick={() => setOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-3">
        {users?.map((e) => {
          return (
            <div key={e.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px', borderRadius: '4px' }}>
              <h2 className="font-semibold text-lg">{e.name}</h2>
              <p className="text-gray-600">{e.description}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleDelete(e)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                <button onClick={() => handleOpenEdit(e)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;