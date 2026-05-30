import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
    sortable: true,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0 ? (
        <Stack direction="row" spacing={1}>
          {attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={url}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#007BFF", // Link color
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Typography color="text.secondary">No Attachments</Typography>
      );
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt={params.row.sender.name}
          src={params.row.sender.avatar}
          sx={{ width: 40, height: 40 }}
        />
        <Typography>{params.row.sender.name}</Typography>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
    align: "center",
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
    sortable: true,
  },
];

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
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
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
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
            bgcolor: "rgba(0, 0, 0, 0.05)", // Subtle skeleton background
          }}
        />
      ) : (
        <Table
          heading="All Messages"
          columns={columns}
          rows={rows}
          rowHeight={100}
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
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

export default MessageManagement;
