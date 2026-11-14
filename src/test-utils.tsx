import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice'; // Укажите правильный путь к вашему слайсу

// Создаем функцию рендеринга, которая автоматически оборачивает компонент в Redux Provider
export function renderWithProviders(
  ui: ReactElement,
  {
    // Можно передать начальное состояние, если нужно
    preloadedState = { counter: { users: [] } },
    store = configureStore({ reducer: { counter: counterReducer }, preloadedState }),
    ...options
  }: any = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}