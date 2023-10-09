import { render, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import todoService from '../services/todo-service';

jest.mock('../services/todo-service');

describe('HomePage', () => {
  beforeEach(() => {
    todoService.getTodos.mockResolvedValue({ result: { data: [] } });
    todoService.addTodo.mockResolvedValue({ success: true, result: { data: { task: 'new task', status: '1' } } });
    todoService.updateTodo.mockResolvedValue({ success: true });
    todoService.deleteTodo.mockResolvedValue({ success: true });
  });

  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('adds a new todo', async () => {
    const { getByText, getByPlaceholderText } = render(<HomePage />);

    fireEvent.change(getByPlaceholderText('Add a task'), { target: { value: 'new task' } });
    fireEvent.click(getByText('Add'));

    await waitFor(() => getByText('new task'));
  });

  it('saves an existing todo', async () => {
    todoService.getTodos.mockResolvedValueOnce({ result: { data: [{ id: '1', task: 'existing task', status: '1' }] } });

    const { getByText, getAllByPlaceholderText } = render(<HomePage />);

    fireEvent.change(getAllByPlaceholderText('Add a task')[1], { target: { value: 'updated task' } });
    fireEvent.click(getByText('Save'));

    await waitFor(() => getByText('updated task'));
  });

  it('deletes an existing todo', async () => {
    todoService.getTodos.mockResolvedValueOnce({ result: { data: [{ id: '1', task: 'existing task', status: '1' }] } });

    const { queryByText, getByText } = render(<HomePage />);

    fireEvent.click(getByText('Delete'));

    await waitFor(() => expect(queryByText('existing task')).toBeNull());
  });
});
