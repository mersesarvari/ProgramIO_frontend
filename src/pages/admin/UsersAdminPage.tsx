import React, { useEffect } from "react";
import { useGetAllUserQuery } from "../../features/users/usersApiSlice";
import Table from "../../components/table/MaterialTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  const columnData = [
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
      Cell: ({ cell }) => {
        return <div>{new Date(cell.getValue()).toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "activated",
      header: "activated",
      size: 150,
      Cell: ({ cell }) => {
        return <div>{cell.getValue().toString()}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "actions",
      size: 150,
      Cell: ({ cell }) => {
        return (
          <div>
            <button>
              <DeleteIcon style={{ color: "red" }} />
            </button>
            <button>
              <EditIcon style={{ color: "blue" }} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {data && <Table data={data} columns={columnData} />}
    </div>
  );
};

export default UsersAdminPage;
