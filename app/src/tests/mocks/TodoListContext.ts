import { Status, Todo } from "@/types/todo.type";
import { mockApiService } from "./apiService";

export const mockTodos: Todo[] = [
  { id: "1", label: "Faire les courses", status: Status.TODO },
  { id: "2", label: "Appeler maman", status: Status.DONE },
  { id: "3", label: "Réviser pour l'examen", status: Status.TODO },
  { id: "4", label: "Aller à la salle", status: Status.DONE },
];

export const resetMocks = () => {
  mockTodos.length = 0;
  mockTodos.push(
    { id: "1", label: "Faire les courses", status: Status.TODO },
    { id: "2", label: "Appeler maman", status: Status.DONE },
    { id: "3", label: "Réviser pour l'examen", status: Status.TODO },
    { id: "4", label: "Aller à la salle", status: Status.DONE }
  );
  Object.values(mockTodoListContext).forEach((mock) => {
    if (typeof mock === "function" && "mockReset" in mock) {
      mock.mockReset();
    }
  });
};

export const mockTodoListContext = {
  todoList: mockTodos,
  isLoading: false,
  error: null,
  setTodoList: jest.fn(),
  addTodo: jest.fn().mockImplementation(async (todo: Omit<Todo, "id">) => {
    const newTodo = await mockApiService.createTodo(todo);
    mockTodos.push(newTodo);
    return newTodo;
  }),
  removeTodo: jest.fn().mockImplementation(async (id: string) => {
    await mockApiService.deleteTodo(id);
    const index = mockTodos.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockTodos.splice(index, 1);
    }
  }),
  updateTodo: jest
    .fn()
    .mockImplementation(async (id: string, todo: Partial<Todo>) => {
      const updatedTodo = await mockApiService.updateTodo(id, todo);
      const index = mockTodos.findIndex((t) => t.id === id);
      if (index !== -1) {
        mockTodos[index] = updatedTodo;
      }
      return updatedTodo;
    }),
  resetMocks,
};
