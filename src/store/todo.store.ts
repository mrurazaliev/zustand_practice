import axios from "axios";
import { create } from "zustand";

export const api = "https://to-dos-api.softclub.tj/api/to-dos";

interface Image {
  id: number;
  imageName: string;
}

export interface Todo {
  id: number;
  isCompleted: boolean;
  images: Image[];
  name: string;
  description: string;
}

interface TodoForm {
  name: string;
  description: string;
}

interface TodoState {
  todo: Todo[];
  getData: () => Promise<void>;
  addUser: (newUser: TodoForm) => Promise<void>;
  editUser: (id: number, updatedUser: TodoForm) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useTodo = create<TodoState>((set, get) => ({
  todo: [],

  getData: async () => {
    try {
      const { data } = await axios.get(api);

      set({ todo: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  addUser: async (newUser) => {
    try {
      const formData = new FormData();

      formData.append("name", newUser.name);
      formData.append("description", newUser.description);

      await axios.post(api, formData);

      await get().getData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  editUser: async (id, updatedUser) => {
    try {
      await axios.put(api, {
        id: id,
        name: updatedUser.name,
        description: updatedUser.description,
      });

      await get().getData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${api}?id=${id}`);

      await get().getData();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));