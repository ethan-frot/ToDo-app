import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "./TodoListContext";
import { Status, Todo, TodoId } from "@/types/todo.type";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/apiService";

const statusPriority = {
  [Status.TODO]: 1,
  [Status.IN_PROGRESS]: 2,
  [Status.ARCHIVED]: 3,
  [Status.DONE]: 4,
};

export const sortTodosByStatus = (todos: Todo[]): Todo[] => {
  if (!todos || !Array.isArray(todos) || todos.length === 0) return [];

  return [...todos].sort((a, b) => {
    if (!a || !b || !a.status || !b.status) return 0;

    const aPriority = statusPriority[a.status] || 999;
    const bPriority = statusPriority[b.status] || 999;
    const statusComparison = aPriority - bPriority;

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
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const todos = await fetchTodos();
        setTodoList(sortTodosByStatus(todos));
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des tâches:", err);
        setError("Impossible de charger les tâches");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const addTodoHandler = async (todo: Omit<Todo, "id">) => {
    try {
      setIsLoading(true);
      const newTodo = await createTodo(todo);
      if (newTodo) {
        setTodoList((prev) => {
          const newList = [...prev, newTodo];
          return sortTodosByStatus(newList);
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une tâche:", error);
      setError("Impossible d'ajouter la tâche");
    } finally {
      setIsLoading(false);
    }
  };

  const removeTodoHandler = async (id: TodoId) => {
    try {
      setIsLoading(true);
      const success = await deleteTodo(id);
      if (success) {
        setTodoList((prev) => {
          const newList = prev.filter((todo) => todo.id !== id);
          return sortTodosByStatus(newList);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression d'une tâche:", error);
      setError("Impossible de supprimer la tâche");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodoHandler = async (id: TodoId, updates: Partial<Todo>) => {
    try {
      setIsLoading(true);
      const updatedTodo = await updateTodo(id, updates);
      if (updatedTodo) {
        setTodoList((prev) => {
          const newList = prev.map((todo) =>
            todo.id === id ? { ...updatedTodo } : todo
          );
          return sortTodosByStatus(newList);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'une tâche:", error);
      setError("Impossible de mettre à jour la tâche");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todoList,
    setTodoList,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
    isLoading,
    error,
  };
};

export { useTodoListContext, useTodoList };
