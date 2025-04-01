import { Todo } from "@/types/todo.type";
import TodoItem from "../TodoItem/TodoItem";
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import TodoFilters from "./TodoFilters";
import TodoProgress from "./TodoProgress";
import { sortTodosByStatus } from "@/context/hook";

const TodoList = ({ list }: { list: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(list);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    setTodos(sortTodosByStatus(list));
  }, [list]);

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus = statusFilter ? todo.status === statusFilter : true;
    const matchesSearch = todo.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          data-testid="new-todo-button"
          onClick={handleAdd}
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl py-3 px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </Button>
      </div>

      <TodoFilters currentFilter={statusFilter} setFilter={setStatusFilter} />

      {todos.length > 0 && <TodoProgress todos={todos} />}

      <Form open={open} setOpen={setOpen} todo={selectedTodo} />

      <div className="space-y-2 mt-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="py-16 text-center text-gray-400 bg-white/5 rounded-xl border border-white/10">
            {todos.length === 0
              ? 'Aucune tâche pour le moment. Cliquez sur "Ajouter" pour commencer.'
              : "Aucune tâche ne correspond à vos critères de recherche."}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
