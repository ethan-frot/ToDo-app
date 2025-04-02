import { TodoListContextType } from "@/types/todoListContext.type";
import { PropsWithChildren, createContext } from "react";
import { useTodoList } from "./hook";

const TodoListContext = createContext<TodoListContextType | null>(null);

const TodoListProvider = ({ children }: PropsWithChildren) => {
  const todoListState = useTodoList();

  return (
    <TodoListContext.Provider value={todoListState}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
