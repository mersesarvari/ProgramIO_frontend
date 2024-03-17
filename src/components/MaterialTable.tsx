import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
} from "material-react-table";

interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];
}

const Table = <TData extends MRT_RowData>({
  columns,
  data,
  ...rest
}: Props<TData>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    ...rest, //accept props to override default table options
  });

  return <MaterialReactTable table={table} />;
};
export default Table;
