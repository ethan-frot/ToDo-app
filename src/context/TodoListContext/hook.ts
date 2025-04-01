import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "./TodoListContext";
import { Status, Todo, TodoId } from "@/types/todo.type";
import { addTodo, removeTodo, updateTodo } from "./utils";
import { getTodos, saveTodos } from "@/lib/localStorage";

// Ordre de priorité des statuts (du plus important au moins important)
const statusPriority = {
  [Status.TODO]: 1, // À FAIRE - priorité la plus élevée
  [Status.IN_PROGRESS]: 2, // EN COURS
  [Status.ARCHIVED]: 3, // ARCHIVÉ
  [Status.DONE]: 4, // FAIT - priorité la plus basse (affiché en bas)
};

// Fonction pour trier les tâches selon leur statut
export const sortTodosByStatus = (todos: Todo[]): Todo[] => {
  if (!todos || !Array.isArray(todos) || todos.length === 0) return [];

  return [...todos].sort((a, b) => {
    // Protection contre les objets invalides
    if (!a || !b || !a.status || !b.status) return 0;

    // D'abord par statut (selon la priorité définie)
    const aPriority = statusPriority[a.status] || 999;
    const bPriority = statusPriority[b.status] || 999;
    const statusComparison = aPriority - bPriority;

    // Si le statut est le même, trier par ordre alphabétique
    if (statusComparison === 0) {
      return a.label.localeCompare(b.label);
    }

    return statusComparison;
  });
};

const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error(
      "useTodoListContext must be used within a TodoListProvider"
    );
  }
  return context;
};

const useTodoList = () => {
  // Initialiser avec les données du localStorage ou les exemples par défaut
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    try {
      const savedTodos = getTodos();

      // Si aucune tâche n'est trouvée dans le localStorage, utiliser les exemples
      if (!savedTodos || savedTodos.length === 0) {
        const defaultTodos = [
          {
            id: "1",
            label: "Créer une liste de tâches",
            status: Status.DONE,
          },
          {
            id: "2",
            label: "Ajouter des fonctionnalités",
            status: Status.IN_PROGRESS,
          },
          {
            id: "3",
            label: "Améliorer l'interface utilisateur",
            status: Status.TODO,
          },
        ];
        return sortTodosByStatus(defaultTodos);
      }

      return sortTodosByStatus(savedTodos);
    } catch (error) {
      console.error("Erreur lors de l'initialisation des tâches:", error);
      return [];
    }
  });

  // Sauvegarder les tâches dans le localStorage à chaque mise à jour
  useEffect(() => {
    try {
      saveTodos(todoList);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des tâches:", error);
    }
  }, [todoList]);

  const addTodoHandler = (todo: Omit<Todo, "id">) => {
    try {
      const newId = Math.random().toString(36).substring(2, 15);
      const newTodo = { ...todo, id: newId as TodoId };
      setTodoList((prev) => {
        const newList = [...prev, newTodo];
        return sortTodosByStatus(newList);
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une tâche:", error);
    }
  };

  const removeTodoHandler = (id: TodoId) => {
    try {
      setTodoList((prev) => {
        const newList = prev.filter((todo) => todo.id !== id);
        return sortTodosByStatus(newList);
      });
    } catch (error) {
      console.error("Erreur lors de la suppression d'une tâche:", error);
    }
  };

  const updateTodoHandler = (id: TodoId, updatedTodo: Partial<Todo>) => {
    try {
      setTodoList((prev) => {
        const newList = prev.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        );
        return sortTodosByStatus(newList);
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'une tâche:", error);
    }
  };

  return {
    todoList,
    setTodoList,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
  };
};

export { useTodoListContext, useTodoList };
