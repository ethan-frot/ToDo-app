import { TableHead, TableHeader, TableRow } from "../ui/table";

const TodoListHeader = ({ fields }: { fields: string[] }) => {
  return (
    <TableHeader>
      <TableRow>
        {fields.map((field) => (
          <TableHead>{field}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TodoListHeader;
