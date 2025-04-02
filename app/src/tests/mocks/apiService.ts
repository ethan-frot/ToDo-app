import { Todo, Status } from "@/types/todo.type";

export const mockTodos: Todo[] = [
  { id: "1", label: "Faire les courses", status: Status.TODO },
  { id: "2", label: "Appeler maman", status: Status.DONE },
  { id: "3", label: "Réviser pour l'examen", status: Status.TODO },
  { id: "4", label: "Aller à la salle", status: Status.DONE },
];

export const mockApiService = {
  fetchTodos: jest.fn().mockResolvedValue(mockTodos),
  fetchTodo: jest.fn().mockImplementation((id: string) => {
    const todo = mockTodos.find((t) => t.id === id);
    return Promise.resolve(todo || null);
  }),
  createTodo: jest.fn().mockImplementation((todo: Omit<Todo, "id">) => {
    const newTodo: Todo = {
      id: (Math.max(...mockTodos.map((t) => parseInt(t.id))) + 1).toString(),
      ...todo,
    };
    mockTodos.push(newTodo);
    return Promise.resolve(newTodo);
  }),
  updateTodo: jest
    .fn()
    .mockImplementation((id: string, todo: Partial<Todo>) => {
      const index = mockTodos.findIndex((t) => t.id === id);
      if (index === -1) {
        return Promise.reject(new Error("Todo not found"));
      }
      const updatedTodo: Todo = {
        ...mockTodos[index],
        ...todo,
      };
      mockTodos[index] = updatedTodo;
      return Promise.resolve(updatedTodo);
    }),
  deleteTodo: jest.fn().mockImplementation((id: string) => {
    const index = mockTodos.findIndex((t) => t.id === id);
    if (index === -1) {
      return Promise.reject(new Error("Todo not found"));
    }
    mockTodos.splice(index, 1);
    return Promise.resolve();
  }),
  resetMocks: () => {
    mockTodos.length = 0;
    mockTodos.push(
      { id: "1", label: "Faire les courses", status: Status.TODO },
      { id: "2", label: "Appeler maman", status: Status.DONE },
      { id: "3", label: "Réviser pour l'examen", status: Status.TODO },
      { id: "4", label: "Aller à la salle", status: Status.DONE }
    );
    Object.values(mockApiService).forEach((mock) => {
      if (typeof mock === "function" && "mockReset" in mock) {
        mock.mockReset();
      }
    });
  },
};
