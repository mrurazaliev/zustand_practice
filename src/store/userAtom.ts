import { atom } from 'jotai';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  description: string;
}

const API_URL = 'https://to-dos-api.softclub.tj/api/categories';

// Базовые атомы состояния
export const usersAtom = atom<User[]>([]);
export const isLoadingAtom = atom<boolean>(false);
export const isErrorAtom = atom<boolean>(false);

// Атомы-экшены (действия)
export const fetchUsersAtom = atom(
  null,
  async (_get, set) => {
    set(isLoadingAtom, true);
    set(isErrorAtom, false);
    try {
      const response = await axios.get(API_URL);
      // Если бэкенд возвращает объект с массивом внутри, например response.data.data
      set(usersAtom, response.data.data || response.data);
    } catch (error) {
      console.error(error);
      set(isErrorAtom, true);
    } finally {
      set(isLoadingAtom, false);
    }
  }
);

export const addUserAtom = atom(
  null,
  async (get, set, newUser: Omit<User, 'id'>) => {
    try {
      await axios.post(API_URL, newUser);
      // Перезапрашиваем список после добавления
      await get(fetchUsersAtom)();
    } catch (error) {
      console.error(error);
    }
  }
);

export const editUserAtom = atom(
  null,
  async (get, set, updatedUser: User) => {
    try {
      await axios.put(API_URL, updatedUser);
      await get(fetchUsersAtom)();
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteUserAtom = atom(
  null,
  async (get, set, user: User) => {
    try {
      // Отправляем весь объект пользователя в теле запроса (как требует Swagger)
      await axios.delete(API_URL, { data: user });
      await get(fetchUsersAtom)();
    } catch (error) {
      console.error(error);
    }
  }
);