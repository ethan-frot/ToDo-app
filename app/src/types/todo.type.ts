export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

export type TodoId = string & { __type?: "TodoId" };

export interface Todo {
  id: TodoId;
  label: string;
  status: Status;
}
