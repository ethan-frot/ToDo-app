import { render, screen } from "@testing-library/react";
import TodoItem from "@/components/TodoItem/TodoItem";
import { Status } from "@/types/todo.type";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockTodoListContext } from "../mocks/TodoListContext";

jest.mock("@/context/hook", () => ({
  useTodoListContext: () => mockTodoListContext,
}));

const mockHandleUpdate = jest.fn();
const mockHandleDelete = jest.fn();

describe("TodoItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTodoItem = (status = Status.TODO) => {
    const todo = {
      id: "1",
      label: "Tâche de test",
      status,
    };

    return render(
      <TodoItem
        item={todo}
        handleUpdate={mockHandleUpdate}
        handleDelete={mockHandleDelete}
      />
    );
  };

  test("devrait afficher correctement une tâche à faire", () => {
    renderTodoItem(Status.TODO);

    expect(screen.getByTestId("todo-element")).toBeInTheDocument();
    expect(screen.getByTestId("todo-label")).toHaveTextContent("Tâche de test");
    expect(screen.getByTestId("todo-status")).toHaveTextContent(Status.TODO);

    expect(screen.getByTestId("edit-todo-button")).toBeInTheDocument();
    expect(screen.getByTestId("remove-todo-button")).toBeInTheDocument();
  });

  test("devrait afficher correctement une tâche terminée", () => {
    renderTodoItem(Status.DONE);

    expect(screen.getByTestId("completed-todo-container")).toBeInTheDocument();
    expect(screen.getByTestId("completed-todo-label")).toHaveTextContent(
      "Tâche de test"
    );
    expect(screen.getByTestId("completed-todo-status")).toHaveTextContent(
      "FAIT"
    );
  });

  test("devrait appeler handleUpdate lorsque le bouton modifier est cliqué", async () => {
    const user = userEvent.setup();
    renderTodoItem();

    await user.click(screen.getByTestId("edit-todo-button"));

    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
    expect(mockHandleUpdate).toHaveBeenCalledWith("1");
  });

  test("devrait appeler handleDelete lorsque le bouton supprimer est cliqué", async () => {
    const user = userEvent.setup();
    renderTodoItem();

    await user.click(screen.getByTestId("remove-todo-button"));

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toHaveBeenCalledWith("1");
  });

  test("devrait basculer le statut lorsqu'on clique sur la case à cocher", async () => {
    const user = userEvent.setup();
    renderTodoItem(Status.TODO);

    const checkbox = screen.getByTestId("todo-checkbox");
    await user.click(checkbox);

    expect(mockTodoListContext.updateTodo).toHaveBeenCalled();
  });
});
