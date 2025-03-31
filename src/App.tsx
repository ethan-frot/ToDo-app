import TodoList from "./components/TodoList";
import { useTodoListContext } from "./context/TodoListContext/hook";

const App = () => {
  const { todoList } = useTodoListContext();
  return (
    <section className="container w-[100vw] m-auto mt-4 flex items-center justify-center">
      <TodoList list={todoList} />
    </section>
  );
};

export default App;
