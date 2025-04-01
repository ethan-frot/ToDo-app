import { Status, Todo, TodoId } from "@/types/todo.type";
import { Button } from "../ui/button";
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import { useTodoListContext } from "@/context/TodoListContext/hook";
import CompletedTodoLabel from "./CompletedTodoLabel";

const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.TODO:
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case Status.IN_PROGRESS:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    case Status.DONE:
      return "bg-green-500/10 text-green-400 border-green-500/30";
    case Status.ARCHIVED:
      return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    default:
      return "bg-teal-500/10 text-teal-400 border-teal-500/30";
  }
};

const TodoItem = ({
  item,
  handleUpdate,
  handleDelete,
}: {
  item: Todo;
  handleUpdate: (id: TodoId) => void;
  handleDelete: (id: TodoId) => void;
}) => {
  const { id, label, status } = item;
  const { updateTodo } = useTodoListContext();

  const handleToggleStatus = () => {
    const newStatus = status === Status.DONE ? Status.TODO : Status.DONE;
    updateTodo(id, { status: newStatus });
  };

  const isDone = status === Status.DONE;

  return (
    <div
      data-testid="todo-element"
      className={`flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors ${
        isDone ? "opacity-85" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={handleToggleStatus}
          className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 border ${
            isDone
              ? "bg-green-500/30 border-green-500"
              : "border-gray-600 hover:border-teal-500"
          }`}
          title={isDone ? "Marquer comme à faire" : "Marquer comme terminée"}
        >
          {isDone && <CheckCircle className="w-5 h-5 text-green-500" />}
        </button>

        {isDone ? (
          <CompletedTodoLabel label={label} />
        ) : (
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate text-white">{label}</span>
            <div className="mt-1 inline-flex">
              <span
                className={`px-2 py-0.5 rounded-sm text-xs font-medium ${getStatusColor(
                  status
                )}`}
              >
                {status}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-2">
        <Button
          onClick={() => handleUpdate(id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-white/10"
        >
          <Edit className="w-4 h-4 text-gray-400 hover:text-teal-400" />
        </Button>
        <Button
          onClick={() => handleDelete(id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-white/10"
          data-testid="remove-todo-button"
        >
          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
