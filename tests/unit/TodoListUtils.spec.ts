import { Status, Todo } from "../../src/types/todo.type";
import { sortTodosByStatus } from "../../src/context/hook";

describe("Todo List Utils", () => {
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
      // @ts-ignore
      expect(sortTodosByStatus(null)).toEqual([]);
      // @ts-ignore
      expect(sortTodosByStatus(undefined)).toEqual([]);
      // @ts-ignore
      expect(sortTodosByStatus("not an array")).toEqual([]);
    });
  });
});
