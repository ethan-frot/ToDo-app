import { Status, Todo } from "@/types/todo.type";

interface TodoProgressProps {
  todos: Todo[];
}

const TodoProgress = ({ todos }: TodoProgressProps) => {
  const totalTasks = todos.length;

  if (totalTasks === 0) {
    return null;
  }

  const completedTasks = todos.filter(
    (todo) => todo.status === Status.DONE
  ).length;
  const inProgressTasks = todos.filter(
    (todo) => todo.status === Status.IN_PROGRESS
  ).length;
  const todoTasks = todos.filter((todo) => todo.status === Status.TODO).length;

  const completedPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div
      className="py-5 px-4 bg-white/5 rounded-xl border border-white/10"
      data-testid="todo-progress-container"
    >
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <div
          className="flex items-center gap-1.5"
          data-testid="completed-tasks"
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>{completedTasks} terminées</span>
        </div>
        <div
          className="flex items-center gap-1.5"
          data-testid="in-progress-tasks"
        >
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span>{inProgressTasks} en cours</span>
        </div>
        <div className="flex items-center gap-1.5" data-testid="todo-tasks">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span>{todoTasks} à faire</span>
        </div>
        <span
          className="font-medium text-teal-300"
          data-testid="percentage-complete"
        >
          {completedPercentage}% complété
        </span>
      </div>

      <div
        className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"
        data-testid="progress-bar-container"
      >
        <div
          className="h-full bg-teal-500 rounded-full"
          style={{ width: `${completedPercentage}%` }}
          data-testid="progress-bar"
        />
      </div>
    </div>
  );
};

export default TodoProgress;
