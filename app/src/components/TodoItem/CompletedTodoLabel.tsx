interface CompletedTodoLabelProps {
  label: string;
}

const CompletedTodoLabel = ({ label }: CompletedTodoLabelProps) => {
  return (
    <div
      className="flex flex-col min-w-0"
      data-testid="completed-todo-container"
    >
      <div className="flex items-center">
        <span
          className="font-medium text-gray-400 line-through truncate"
          data-testid="completed-todo-label"
        >
          {label}
        </span>
      </div>
      <div className="mt-1">
        <div className="inline-flex">
          <span
            className="bg-green-900/20 text-green-400 px-2 py-0.5 text-xs font-bold uppercase"
            data-testid="completed-todo-status"
          >
            FAIT
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompletedTodoLabel;
