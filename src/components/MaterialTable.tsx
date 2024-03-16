import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

//example data type
type User = {
  username: string;
  email: string;
  creationDate: string;
  activated: boolean;
};

type BasicTableProps = {
  data: User[];
};
const ExampleTable: React.FC<BasicTableProps> = ({ data }) => {
  //should be memoized or stable

  const cols = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "username", //access nested data with dot notation
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "creationDate", //normal accessorKey
        header: "creationDate",
        size: 200,
      },
      {
        accessorKey: "activated",
        header: "activated",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: cols,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default ExampleTable;
