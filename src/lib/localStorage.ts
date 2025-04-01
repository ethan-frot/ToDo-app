import { Todo } from "@/types/todo.type";

const TODO_STORAGE_KEY = "todo-app-tasks";

/**
 * Récupère les tâches depuis le localStorage
 */
export const getTodos = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (!storedTodos) return [];

    const parsedTodos = JSON.parse(storedTodos);
    if (!Array.isArray(parsedTodos)) {
      console.error(
        "Les données stockées ne sont pas un tableau:",
        parsedTodos
      );
      return [];
    }

    return parsedTodos;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    return [];
  }
};

/**
 * Sauvegarde les tâches dans le localStorage
 */
export const saveTodos = (todos: Todo[]): void => {
  try {
    if (!todos) {
      console.error("Tentative de sauvegarde de tâches nulles ou undefined");
      return;
    }

    if (!Array.isArray(todos)) {
      console.error("Tentative de sauvegarde d'un non-tableau:", todos);
      return;
    }

    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des tâches:", error);
  }
};
