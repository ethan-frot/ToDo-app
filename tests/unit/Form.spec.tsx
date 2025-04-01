import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../../src/components/Form/Form";
import { Status } from "../../src/types/todo.type";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/context/hook", () => ({
  useTodoListContext: () => ({
    addTodo: jest.fn(),
    updateTodo: jest.fn(),
  }),
}));

const mockSetOpen = jest.fn();

describe("Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("devrait rendre le formulaire de création correctement", () => {
    render(<Form open={true} setOpen={mockSetOpen} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/que devez-vous faire/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/annuler/i)).toBeInTheDocument();
    expect(screen.getByText(/ajouter/i)).toBeInTheDocument();
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
    const mockAddTodo = jest.fn();
    jest.mock(
      "../../src/context/hook",
      () => ({
        useTodoListContext: () => ({
          addTodo: mockAddTodo,
          updateTodo: jest.fn(),
        }),
      }),
      { virtual: true }
    );

    const user = userEvent.setup();

    render(<Form open={true} setOpen={mockSetOpen} />);
    await user.type(
      screen.getByPlaceholderText(/que devez-vous faire/i),
      "Nouvelle tâche"
    );

    await user.click(screen.getByTestId("submit-new-todo-button"));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("devrait fermer le formulaire lorsqu'on clique sur Annuler", async () => {
    const user = userEvent.setup();

    render(<Form open={true} setOpen={mockSetOpen} />);

    await user.click(screen.getByText(/annuler/i));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
