import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './components/Home';
import { renderWithProviders } from './test-utils';

describe('Компонент Home (Интеграционные тесты)', () => {

  it('должен отображать список пользователей из Redux стейта', () => {
    // Подготавливаем начальное состояние с одним пользователем
    const preloadedState = {
      counter: {
        users: [{ id: 1, name: 'Иван Иванов', email: 'ivan@test.com' }],
      },
    };

    // Рендерим компонент с этим стейтом
    renderWithProviders(<Home />, { preloadedState });

    // Проверяем, что имя и email появились на экране
    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText('ivan@test.com')).toBeInTheDocument();
  });

  it('должен открывать модальное окно и добавлять нового пользователя', async () => {
    renderWithProviders(<Home />);

    // 1. Изначально формы добавления быть не должно
    expect(screen.queryByText('New User')).not.toBeInTheDocument();

    // 2. Кликаем на кнопку добавления пользователя
    const addButton = screen.getByRole('button', { name: /\s*+ add user/i });
    fireEvent.click(addButton);

    // 3. Проверяем, что модальное окно открылось
    expect(screen.getByText('New User')).toBeInTheDocument();

    // 4. Заполняем поля ввода (Name и Email)
    const nameInput = screen.getByLabelText(/user name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(nameInput, { target: { value: 'Петр Петров' } });
    fireEvent.change(emailInput, { target: { value: 'petr@test.com' } });

    // 5. Нажимаем кнопку Save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // 6. Проверяем, что новый пользователь появился в списке на экране
    expect(await screen.findByText('Петр Петров')).toBeInTheDocument();
    expect(screen.getByText('petr@test.com')).toBeInTheDocument();
  });

  it('должен удалять пользователя при клике на кнопку Delete', () => {
    const preloadedState = {
      counter: {
        users: [{ id: 1, name: 'Анна Смирнова', email: 'anna@test.com' }],
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    // Убеждаемся, что пользователь есть на экране
    expect(screen.getByText('Анна Смирнова')).toBeInTheDocument();

    // Находим кнопку удаления и кликаем на нее
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Проверяем, что пользователя больше нет на экране
    expect(screen.queryByText('Анна Смирнова')).not.toBeInTheDocument();
  });

});