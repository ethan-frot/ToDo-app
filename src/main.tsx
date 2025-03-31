import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TodoListProvider } from "./context/TodoListContext/TodoListContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoListProvider>
      <App />
    </TodoListProvider>
  </StrictMode>
);
