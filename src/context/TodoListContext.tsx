import { TodoListContextType } from "@/types/todoListContext.type.ts";
import { createContext, JSX } from "react";
import { useTodoList } from "./hook.ts";

const TodoListContext = createContext<TodoListContextType | null>(null);

const TodoListProvider = ({ children }: { children: JSX.Element }) => {
  const todoList = useTodoList();
  return (
    <TodoListContext.Provider value={todoList}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
