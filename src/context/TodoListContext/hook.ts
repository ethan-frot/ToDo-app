import { useContext, useState } from "react";
import { TodoListContext } from "./TodoListContext";
import { Status, Todo, TodoId } from "@/types/todo.type";
import { addTodo, removeTodo, updateTodo } from "./utils";

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
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: "1",
      label: "Hello la todo",
      status: Status.TODO,
    },
    {
      id: "2",
      label: "Hello la deuxième todo",
      status: Status.TODO,
    },
  ]);

  return {
    todoList,
    setTodoList,
    addTodo: (todo: Omit<Todo, "id">) => addTodo(todo, setTodoList),
    removeTodo: (id: TodoId) => removeTodo(id, setTodoList),
    updateTodo: (id: TodoId, updatedTodo: Partial<Todo>) =>
      updateTodo({ id, updatedTodo, setTodoList }),
  };
};

export { useTodoListContext, useTodoList };
