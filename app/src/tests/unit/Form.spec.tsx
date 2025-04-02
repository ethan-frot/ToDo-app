import { render, screen } from "@testing-library/react";
import Form from "@/components/Form/Form";
import { Status } from "@/types/todo.type";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockTodoListContext, resetMocks } from "../mocks/TodoListContext";

jest.mock("@/context/hook", () => ({
  useTodoListContext: () => mockTodoListContext,
}));

const mockSetOpen = jest.fn();

describe("Form Component", () => {
  beforeEach(() => {
    resetMocks();
    mockSetOpen.mockClear();
  });

  test("devrait rendre le formulaire de création correctement", () => {
    render(<Form open={true} setOpen={mockSetOpen} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("new-todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-status-select")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
    expect(screen.getByTestId("submit-new-todo-button")).toBeInTheDocument();
  });

  test("devrait rendre le formulaire de modification avec les données existantes", () => {
    const mockTodo = {
      id: "123",
      label: "Tâche existante",
      status: Status.IN_PROGRESS,
    };

    render(<Form open={true} setOpen={mockSetOpen} todo={mockTodo} />);

    expect(screen.getByDisplayValue("Tâche existante")).toBeInTheDocument();
    expect(screen.getByText(/enregistrer/i)).toBeInTheDocument();
  });

  test("devrait soumettre le formulaire avec les nouvelles valeurs", async () => {
    const user = userEvent.setup();

    render(<Form open={true} setOpen={mockSetOpen} />);
    await user.type(screen.getByTestId("new-todo-input"), "Nouvelle tâche");
    await user.click(screen.getByTestId("submit-new-todo-button"));

    expect(mockTodoListContext.addTodo).toHaveBeenCalled();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("devrait fermer le formulaire lorsqu'on clique sur Annuler", async () => {
    const user = userEvent.setup();

    render(<Form open={true} setOpen={mockSetOpen} />);

    await user.click(screen.getByTestId("cancel-button"));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
