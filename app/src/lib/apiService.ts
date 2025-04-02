import { Todo, TodoId, Status } from "@/types/todo.type";

const API_URL = "http://localhost:8000/api";

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    return [];
  }
};

export const fetchTodo = async (id: TodoId): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
    return null;
  }
};

export const createTodo = async (todo: {
  label: string;
  status: Status;
}): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création d'une tâche:", error);
    return null;
  }
};

export const updateTodo = async (
  id: TodoId,
  todo: Partial<Todo>
): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la tâche ${id}:`, error);
    return null;
  }
};

export const deleteTodo = async (id: TodoId): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la tâche ${id}:`, error);
    return false;
  }
};
