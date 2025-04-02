import { Todo, Status } from "@/types/todo.type";

describe("Status Enum", () => {
  test("should have the correct values", () => {
    expect(Status.TODO).toBe("À FAIRE");
    expect(Status.IN_PROGRESS).toBe("EN COURS");
    expect(Status.DONE).toBe("FAIT");
    expect(Status.ARCHIVED).toBe("ARCHIVÉ");
  });
});

describe("Todo Type", () => {
  test("should create a valid Todo object", () => {
    const todo: Todo = {
      id: "1",
      label: "Test todo",
      status: Status.TODO,
    };

    expect(todo.id).toBe("1");
    expect(todo.label).toBe("Test todo");
    expect(todo.status).toBe(Status.TODO);
  });
});
