import { TodoListContextType } from "@/types/todoListContext.type";
import { PropsWithChildren, createContext } from "react";
import { useTodoList } from "./hook";
import { Todo, TodoId } from "@/types/todo.type";

export interface ITodoListContext {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  removeTodo: (id: TodoId) => Promise<void>;
  updateTodo: (id: TodoId, todo: Partial<Todo>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const TodoListContext = createContext<ITodoListContext | null>(null);

const TodoListProvider = ({ children }: PropsWithChildren) => {
  const todoListState = useTodoList();

  return (
    <TodoListContext.Provider value={todoListState}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListProvider };
