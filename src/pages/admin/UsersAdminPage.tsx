import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetAllUserQuery } from "../../features/users/usersApiSlice";
import ExampleTable from "../../components/MaterialTable";

type User = {
  username: string;
  email: string;
  creationDate: string;
  activated: boolean;
};

console.log("UserAdminPage:");

const UsersAdminPage = () => {
  const { data, error, isLoading } = useGetAllUserQuery();
  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log("Users:", data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {data && <ExampleTable data={data} />}
    </div>
  );
};

export default UsersAdminPage;
