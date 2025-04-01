import { Status } from "@/types/todo.type";
import { Button } from "../ui/button";

type FilterOption = {
  value: string | null;
  label: string;
};

// Options de filtrage incluant "Toutes" et tous les statuts
const filterOptions: FilterOption[] = [
  { value: null, label: "Toutes" },
  ...Object.values(Status).map((status) => ({ value: status, label: status })),
];

interface TodoFiltersProps {
  currentFilter: string | null;
  setFilter: (filter: string | null) => void;
}

const TodoFilters = ({ currentFilter, setFilter }: TodoFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.label}
          size="sm"
          variant="ghost"
          className={
            currentFilter === option.value
              ? "bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30"
              : "text-gray-400 hover:bg-white/5 border border-transparent hover:border-white/10"
          }
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilters;
