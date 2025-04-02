import { Status, Todo } from "@/types/todo.type";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useTodoListContext } from "@/context/hook";
import { Check, X } from "lucide-react";

const Form = ({
  open,
  setOpen,
  todo,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: Todo;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const { addTodo, updateTodo } = useTodoListContext();

  useEffect(() => {
    if (open) {
      reset({
        label: todo?.label || "",
        status: todo?.status || Status.TODO,
      });
    }
  }, [open, todo, reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ label: "", status: Status.TODO });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: FieldValues) => {
    if (todo) {
      updateTodo(todo.id, {
        ...data,
      });
    } else {
      addTodo(data as Omit<Todo, "id">);
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset({ label: "", status: Status.TODO });
        }
        setOpen(isOpen);
      }}
      defaultOpen={false}
    >
      <DialogContent className="bg-white/10 backdrop-blur-lg text-white border-none shadow-xl rounded-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-white mb-4">
            {todo ? "Modifier" : "Nouvelle tâche"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="label"
            defaultValue={todo?.label || ""}
            rules={{ required: "Ce champ est requis" }}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Que devez-vous faire ?"
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none text-white placeholder-gray-400"
                  data-testid="new-todo-input"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-400">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="status"
            defaultValue={todo?.status || Status.TODO}
            rules={{ required: "Ce champ est requis" }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <select
                  value={value}
                  onChange={onChange}
                  data-testid="todo-status-select"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none text-white"
                >
                  {Object.entries(Status).map(([key, value]) => (
                    <option
                      key={key}
                      value={value}
                      className="bg-gray-800 text-white"
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={() => {
                reset({ label: "", status: Status.TODO });
                setOpen(false);
              }}
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-gray-300 rounded-xl"
              data-testid="cancel-button"
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>

            <Button
              data-testid="submit-new-todo-button"
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl"
            >
              <Check className="w-4 h-4 mr-2" />
              {todo ? "Enregistrer" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
