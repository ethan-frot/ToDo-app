import { Todo } from "@/types/todo.type";
import { Table, TableBody } from "../ui/table";
import TodoListHeader from "./TodoListHeader";
import { FIELDS } from "./utils";
import TodoItem from "../TodoItem";
import { useEffect, useState } from "react";
import Form from "../Form";
import { Button } from "../ui/button";

const TodoList = ({ list }: { list: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(list);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleUpdate = (id: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (!currentTodo) return;
    setSelectedTodo(currentTodo);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAdd = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!open) {
      setSelectedTodo(undefined);
    }
  }, [open]);

  return (
      <div className="w-full flex flex-col gap-4 items-end">
        <Form open={open} setOpen={setOpen} todo={selectedTodo} />
        <Button data-testid="new-todo-button" onClick={handleAdd}>
          Ajouter
        </Button>
        <Table width={"100%"}>
          <TodoListHeader fields={FIELDS} />
          <TableBody>
            {todos.map((item) => (
                <TodoItem key={item.id} item={item} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </div>
  );
};


export default TodoList;
