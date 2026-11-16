import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  type User,
} from '../api/UserApi';
import { useState } from 'react';

const userSchema = z.object({
  name: z.string().min(5, 'Имя должно содержать минимум 5 символов'),
  description: z.string().min(1, 'Введите описание'),
});

type UserFormData = z.infer<typeof userSchema>;

export const Home = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const [addUser] = useAddUserMutation();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onAddSubmit = async (data: UserFormData) => {
    await addUser(data);
    resetAdd();
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    resetEdit({
      name: user.name,
      description: user.description,
    });
  };

  const onEditSubmit = async (data: UserFormData) => {
    if (editingId === null) return;

    await editUser({ id: editingId, ...data });
    setEditingId(null);
  };

  if (isLoading) {
    return <div className="p-5">Загрузка...</div>;
  }

  if (isError) {
    return (
      <div className="p-5 text-red-500">
        Ошибка при загрузке данных
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>

      <form
        onSubmit={handleSubmitAdd(onAddSubmit)}
        className="flex flex-col gap-3 mb-6 p-4 border rounded bg-gray-50"
      >
        <h2 className="font-semibold text-lg">
          Добавить нового пользователя
        </h2>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Имя"
              {...registerAdd('name')}
              className="border p-2 rounded w-full"
            />

            {errorsAdd.name && (
              <span className="text-red-500 text-sm">
                {errorsAdd.name.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Описание"
              {...registerAdd('description')}
              className="border p-2 rounded w-full"
            />

            {errorsAdd.description && (
              <span className="text-red-500 text-sm">
                {errorsAdd.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded h-fit"
          >
            Добавить
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {users?.data?.map((user) => (
          <li
            key={user.id}
            className="border p-3 rounded flex items-center justify-between gap-4"
          >
            {editingId === user.id ? (
              <form
                onSubmit={handleSubmitEdit(onEditSubmit)}
                className="flex gap-2 flex-1 items-center"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    {...registerEdit('name')}
                    className="border p-1 rounded w-full"
                  />

                  {errorsEdit.name && (
                    <span className="text-red-500 text-xs">
                      {errorsEdit.name.message}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    {...registerEdit('description')}
                    className="border p-1 rounded w-full"
                  />

                  {errorsEdit.description && (
                    <span className="text-red-500 text-xs">
                      {errorsEdit.description.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1 rounded h-fit"
                >
                  Сохранить
                </button>

                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded h-fit"
                >
                  Отмена
                </button>
              </form>
            ) : (
              <>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">
                    {user.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Изменить
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;