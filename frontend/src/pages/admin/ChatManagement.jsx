import { useFetchData } from "6pp";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <AvatarCard
        avatar={params.row.avatar}
        sx={{
          width: 40,
          height: 40,
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow
        }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
    align: "center",
    renderCell: (params) => (
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: params.row.groupChat ? "#28a745" : "#dc3545", // Green for true, red for false
        }}
      >
        {params.row.groupChat ? "Yes" : "No"}
      </Typography>
    ),
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard
        max={5} // Show up to 5 avatars
        avatar={params.row.members}
        sx={{
          display: "flex",
          gap: "0.5rem",
          width: "fit-content",
        }}
      />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 150,
    align: "center",
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          alt={params.row.creator.name}
          src={params.row.creator.avatar}
          sx={{
            width: 40,
            height: 40,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
          {params.row.creator.name}
        </Typography>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
          members: chat.members.map((member) =>
            transformImage(member.avatar, 50)
          ),
          creator: {
            name: chat.creator.name,
            avatar: transformImage(chat.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton
          variant="rectangular"
          height="100vh"
          sx={{
            borderRadius: "16px",
            bgcolor: "rgba(0, 0, 0, 0.05)", // Light gray background
          }}
        />
      ) : (
        <Table
          heading="All Chats"
          columns={columns}
          rows={rows}
          rowHeight={100}
          sx={{
            backgroundColor: "white", // White background for the table
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
            padding: "1rem",
          }}
          headerStyles={{
            backgroundColor: "#f5f5f5", // Light gray header background
            color: "black", // Black header text
            fontWeight: "bold",
          }}
        />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
