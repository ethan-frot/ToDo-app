import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

jest.mock("@/lib/apiService", () => ({
  fetchTodos: jest.fn().mockResolvedValue([]),
  fetchTodo: jest.fn().mockResolvedValue(null),
  createTodo: jest
    .fn()
    .mockImplementation((todo) => Promise.resolve({ id: "mock-id", ...todo })),
  updateTodo: jest
    .fn()
    .mockImplementation((id, updates) => Promise.resolve({ id, ...updates })),
  deleteTodo: jest.fn().mockResolvedValue(true),
}));
