export enum Status {
  TODO = "À FAIRE",
  IN_PROGRESS = "EN COURS",
  DONE = "FAIT",
  ARCHIVED = "ARCHIVÉ",
}

export type TodoId = string & { __type?: "TodoId" };

export interface Todo {
  id: TodoId;
  label: string;
  status: Status;
}
