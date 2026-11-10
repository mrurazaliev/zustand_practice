import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice";

export const store = configureStore({
  reducer: {
    Todochka: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;