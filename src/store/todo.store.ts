import { create } from 'zustand'
import axios from 'axios';

interface Todo {
  id: number
  name: string;
  description: string;
}

interface TodoStore {
  users: Todo[]

  isLoading: boolean;
  isError: boolean;
  
  getUsers: () => Promise<void>;
  addUser: (newUser: Omit<Todo, 'id'>) => Promise<void>;
  editUser: (updatedUser: Todo) => Promise<void>;
  deleteUser: (user: Todo) => Promise<void>; 
}

const API_URL = 'https://to-dos-api.softclub.tj/api/categories'

export const useUserStore = create<TodoStore>()((set,get) => ({
  users: [],
  isLoading: false,
  isError: false,


  getUsers: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axios.get(API_URL);
      set({ users: response.data.data || response.data, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  },

  addUser: async (newUser) => {
    try {
      await axios.post(API_URL, newUser);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },

  editUser: async (updatedUser) => {
    try {
      await axios.put(API_URL, updatedUser);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (user) => {
    try {
      await axios.delete(API_URL, {
        data: user,
      });
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
}))