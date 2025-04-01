import TodoList from "./components/TodoList";
import { useTodoListContext } from "./context/hook.ts";
import { UserCircle2 } from "lucide-react";

const App = () => {
  const { todoList } = useTodoListContext();

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate = today.toLocaleDateString("fr-FR", options);
  const [dayName, dayNumber, monthName] = formattedDate.split(" ");
  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-slate-800 text-white">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-white mb-1">
              {capitalizedDay} {dayNumber}
              <span className="text-gray-400 ml-2">{monthName}</span>
            </h1>
          </div>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
            <UserCircle2 className="w-6 h-6 text-teal-400" />
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
          <TodoList list={todoList} />
        </div>
      </div>
    </div>
  );
};

export default App;
