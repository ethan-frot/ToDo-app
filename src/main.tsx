import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TodoListProvider } from "./context/TodoListContext.tsx";

createRoot(document.getElementById("root")!).render(
    <TodoListProvider>
      <App />
    </TodoListProvider>
);
