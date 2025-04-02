import { Status, Todo } from "@/types/todo.type";
import { sortTodosByStatus } from "@/context/hook";

const addTodo = (todo: Omit<Todo, "id">, setTodoList: Function) => {
  const newId = Math.random().toString(36).substring(2, 15);
  const newTodo = { ...todo, id: newId };
  setTodoList((prev: Todo[]) => {
    const newList = [...prev, newTodo];
    return sortTodosByStatus(newList);
  });
};

const removeTodo = (id: string, setTodoList: Function) => {
  setTodoList((prev: Todo[]) => {
    const newList = prev.filter((todo) => todo.id !== id);
    return sortTodosByStatus(newList);
  });
};

const updateTodo = ({
  id,
  updatedTodo,
  setTodoList,
}: {
  id: string;
  updatedTodo: Partial<Todo>;
  setTodoList: Function;
}) => {
  setTodoList((prev: Todo[]) => {
    const newList = prev.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    return sortTodosByStatus(newList);
  });
};

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("TodoListContext - Fonctions utilitaires", () => {
  describe("sortTodosByStatus", () => {
    test("devrait trier les tâches par statut dans l'ordre correct", () => {
      const mockTodos: Todo[] = [
        { id: "1", label: "Tâche terminée", status: Status.DONE },
        { id: "2", label: "Tâche à faire", status: Status.TODO },
        { id: "3", label: "Tâche en cours", status: Status.IN_PROGRESS },
        { id: "4", label: "Tâche archivée", status: Status.ARCHIVED },
      ];

      const sortedTodos = sortTodosByStatus(mockTodos);

      expect(sortedTodos[0].status).toBe(Status.TODO);
      expect(sortedTodos[1].status).toBe(Status.IN_PROGRESS);
      expect(sortedTodos[2].status).toBe(Status.ARCHIVED);
      expect(sortedTodos[3].status).toBe(Status.DONE);
    });

    test("devrait trier les tâches alphabétiquement si elles ont le même statut", () => {
      const mockTodos: Todo[] = [
        { id: "1", label: "Z Tâche", status: Status.TODO },
        { id: "2", label: "A Tâche", status: Status.TODO },
        { id: "3", label: "B Tâche", status: Status.TODO },
      ];

      const sortedTodos = sortTodosByStatus(mockTodos);

      expect(sortedTodos[0].label).toBe("A Tâche");
      expect(sortedTodos[1].label).toBe("B Tâche");
      expect(sortedTodos[2].label).toBe("Z Tâche");
    });

    test("devrait retourner un tableau vide si le tableau d'entrée est vide", () => {
      expect(sortTodosByStatus([])).toEqual([]);
    });

    test("devrait gérer correctement les données non valides", () => {
      expect(sortTodosByStatus(null as any)).toEqual([]);
      expect(sortTodosByStatus(undefined as any)).toEqual([]);
      expect(sortTodosByStatus("not an array" as any)).toEqual([]);
    });
  });

  describe("Fonctions de manipulation des tâches", () => {
    let mockSetTodoList: jest.Mock;
    let mockTodos: Todo[];

    beforeEach(() => {
      mockSetTodoList = jest.fn();
      mockTodos = [
        { id: "1", label: "Tâche 1", status: Status.TODO },
        { id: "2", label: "Tâche 2", status: Status.IN_PROGRESS },
      ];
    });

    test("addTodo - devrait ajouter une nouvelle tâche", () => {
      const newTodo = { label: "Nouvelle tâche", status: Status.TODO };
      addTodo(newTodo, mockSetTodoList);

      expect(mockSetTodoList).toHaveBeenCalled();

      const updateFunction = mockSetTodoList.mock.calls[0][0];
      const result = updateFunction(mockTodos);

      expect(result.length).toBe(mockTodos.length + 1);

      const addedTodo = result.find((todo) => todo.label === newTodo.label);
      expect(addedTodo).toBeDefined();
      expect(addedTodo?.label).toBe(newTodo.label);
      expect(addedTodo?.status).toBe(newTodo.status);
    });

    test("removeTodo - devrait supprimer une tâche existante", () => {
      const idToRemove = "1";
      removeTodo(idToRemove, mockSetTodoList);

      expect(mockSetTodoList).toHaveBeenCalled();

      const updateFunction = mockSetTodoList.mock.calls[0][0];
      const result = updateFunction(mockTodos);

      expect(result.length).toBe(mockTodos.length - 1);
      expect(result.find((todo) => todo.id === idToRemove)).toBeUndefined();
    });

    test("updateTodo - devrait mettre à jour une tâche existante", () => {
      const idToUpdate = "1";
      const updates = { label: "Tâche mise à jour", status: Status.DONE };

      updateTodo({
        id: idToUpdate,
        updatedTodo: updates,
        setTodoList: mockSetTodoList,
      });

      expect(mockSetTodoList).toHaveBeenCalled();

      const updateFunction = mockSetTodoList.mock.calls[0][0];
      const result = updateFunction(mockTodos);

      const updatedTodo = result.find((todo) => todo.id === idToUpdate);
      expect(updatedTodo).toBeDefined();
      expect(updatedTodo?.label).toBe(updates.label);
      expect(updatedTodo?.status).toBe(updates.status);
    });
  });
});
