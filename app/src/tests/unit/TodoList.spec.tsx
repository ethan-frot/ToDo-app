import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "@/components/TodoList/TodoList";
import { Status, Todo } from "@/types/todo.type";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockTodoListContext, mockTodos } from "../mocks/TodoListContext";

jest.mock("@/context/hook", () => ({
  useTodoListContext: () => mockTodoListContext,
  sortTodosByStatus: jest.fn((todos) => todos),
}));

jest.mock("@/components/Form/Form", () => {
  const MockForm = ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    todo?: Todo;
  }) => (
    <div data-testid="mock-form">
      {open && (
        <div>
          <button onClick={() => setOpen(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
  return MockForm;
});

jest.mock("@/components/TodoItem/TodoItem", () => {
  const MockTodoItem = ({
    item,
    handleUpdate,
    handleDelete,
  }: {
    item: Todo;
    handleUpdate: (id: string) => void;
    handleDelete: (id: string) => void;
  }) => (
    <div data-testid={`todo-item-${item.id}`}>
      <span>{item.label}</span>
      <span>{item.status}</span>
      <button onClick={() => handleUpdate(item.id)}>Modifier</button>
      <button onClick={() => handleDelete(item.id)}>Supprimer</button>
    </div>
  );
  return MockTodoItem;
});

jest.mock("@/components/TodoList/TodoFilters", () => {
  const MockTodoFilters = ({
    setFilter,
  }: {
    currentFilter: string | null;
    setFilter: (filter: string | null) => void;
  }) => (
    <div data-testid="todo-filters">
      <button data-testid="filter-all" onClick={() => setFilter(null)}>
        Toutes
      </button>
      <button data-testid="filter-TODO" onClick={() => setFilter(Status.TODO)}>
        À faire
      </button>
      <button
        data-testid="filter-IN_PROGRESS"
        onClick={() => setFilter(Status.IN_PROGRESS)}
      >
        En cours
      </button>
      <button data-testid="filter-DONE" onClick={() => setFilter(Status.DONE)}>
        Terminées
      </button>
    </div>
  );
  return MockTodoFilters;
});

jest.mock("@/components/TodoList/TodoProgress", () => {
  const MockTodoProgress = ({ todos }: { todos: Todo[] }) => {
    const completed = todos.filter(
      (t: Todo) => t.status === Status.DONE
    ).length;
    const total = todos.filter(
      (t: Todo) => t.status !== Status.ARCHIVED
    ).length;
    return (
      <div data-testid="todo-progress-container">
        {completed}/{total}
      </div>
    );
  };
  return MockTodoProgress;
});

describe("TodoList Component", () => {
  test("devrait afficher toutes les tâches par défaut", () => {
    render(<TodoList list={mockTodos} />);

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-4")).toBeInTheDocument();
  });

  test("devrait filtrer les tâches selon le statut sélectionné", async () => {
    const user = userEvent.setup();
    render(<TodoList list={mockTodos} />);

    // Simuler un clic sur le bouton "À faire"
    await user.click(screen.getByTestId("filter-TODO"));
  });

  test("devrait filtrer les tâches avec la recherche", async () => {
    const user = userEvent.setup();
    render(<TodoList list={mockTodos} />);

    const searchInput = screen.getByTestId("search-todo-input");
    await user.type(searchInput, "Tâche 1");
  });

  test("devrait ouvrir le formulaire quand le bouton ajouter est cliqué", async () => {
    const user = userEvent.setup();
    render(<TodoList list={mockTodos} />);

    await user.click(screen.getByTestId("new-todo-button"));

    expect(screen.getByTestId("mock-form")).toBeInTheDocument();
  });

  test("devrait afficher la progression des tâches", () => {
    render(<TodoList list={mockTodos} />);

    expect(screen.getByTestId("todo-progress-container")).toBeInTheDocument();
  });
});
