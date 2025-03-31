import { Todo, TodoId } from "@/types/todo.type";

const addTodo = (
  todo: Omit<Todo, "id">,
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const newId = Math.random().toString(36).substring(2, 15);
  const newTodo = { ...todo, id: newId };
  setTodoList((prev) => [...prev, newTodo]);
};

const removeTodo = (
  id: TodoId,
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setTodoList((prev) => prev.filter((todo) => todo.id !== id));
};

const updateTodo = ({
  id,
  updatedTodo,
  setTodoList,
}: {
  id: TodoId;
  updatedTodo: Partial<Todo>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  setTodoList((prev) =>
    prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
  );
};

export { addTodo, removeTodo, updateTodo };
