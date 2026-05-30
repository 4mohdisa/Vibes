import { useFetchData } from "6pp";
import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

// Define table column configuration
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
    sortable: true,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 120,
    renderCell: (params) => (
      <Avatar
        alt={params.row.name}
        src={params.row.avatar}
        sx={{
          width: 40,
          height: 40,
        }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
    sortable: true,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
    sortable: true,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
    sortable: true,
    align: "center",
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
    sortable: true,
    align: "center",
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );

  // Handle errors using the custom hook
  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  // Transform data for the table
  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((user) => ({
          ...user,
          id: user._id,
          avatar: transformImage(user.avatar, 50),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton
          height={"100vh"}
          variant="rectangular"
          sx={{
            borderRadius: "16px",
          }}
        />
      ) : (
        <Table
          heading="All Users"
          columns={columns}
          rows={rows}
          sx={{
            backgroundColor: "white", // Table background
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
            borderRadius: "16px", // Rounded corners
            padding: "1rem",
          }}
          headerStyles={{
            backgroundColor: "#f5f5f5", // Light gray header
            color: "black",
            fontWeight: "bold",
          }}
        />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
