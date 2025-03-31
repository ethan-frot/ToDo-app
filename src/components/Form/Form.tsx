import { Status, Todo } from "@/types/todo.type";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useTodoListContext } from "@/context/TodoListContext/hook";

const Form = ({
  open,
  setOpen,
  todo,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: Todo;
}) => {
  const { handleSubmit, control } = useForm();
  const { addTodo, updateTodo } = useTodoListContext();

  const onSubmit = (data: FieldValues) => {
    if (todo) {
      // Update existing todo
      updateTodo(todo.id, {
        ...data,
      });
      console.log("Updating todo:", todo.id, data);
    } else {
      // Add new todo
      addTodo(data as Omit<Todo, "id">);
      console.log("Adding new todo:", data);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen={false}>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 m-3"
        >
          <Controller
            name="label"
            defaultValue={todo?.label || ""}
            rules={{ required: "Ce champ est requis" }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                type="text"
                placeholder="Ajouter une todo"
                value={value}
                onChange={onChange}
                className="input input-bordered w-full"
                data-testid="new-todo-input"
                required
              />
            )}
          />
          <Controller
            name="status"
            defaultValue={todo?.status || Status.TODO}
            rules={{ required: "Ce champ est requis" }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                value={value}
                onChange={onChange}
                className="select select-bordered w-full"
              >
                {Object.entries(Status).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            )}
          />
          <Button data-testid="submit-new-todo-button" type="submit">{todo ? "Modifier" : "Ajouter"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
