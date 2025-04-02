import { TableHead, TableHeader, TableRow } from "../ui/table";

const TodoListHeader = ({ fields }: { fields: string[] }) => {
  return (
    <TableHeader className="bg-gray-900 border-b border-gray-700">
      <TableRow>
        {fields.map((field, index) => (
          <TableHead key={index} className="text-purple-300 font-medium py-4">
            {field}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TodoListHeader;
