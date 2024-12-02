import { Button, ListItem, Stack, Typography, Avatar } from "@mui/material";
import React, { memo, useState } from "react";

const UserItem = ({ user, handler, isAdded = false }) => {
  const { name, avatar } = user;
  const [added, setAdded] = useState(isAdded);

  const handleAddClick = () => {
    handler();
    setAdded(true);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        bgcolor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={avatar} alt={name} />
        <Typography sx={{ fontWeight: 500, color: "rgba(0, 0, 0, 0.8)" }}>
          {name}
        </Typography>
      </Stack>
      <Button
        variant={added ? "outlined" : "contained"}
        onClick={handleAddClick}
        disabled={added}
        sx={{
          borderRadius: "16px",
          textTransform: "none",
          bgcolor: added ? "transparent" : "primary.main",
          color: added ? "gray" : "white",
          "&:hover": {
            bgcolor: added ? "transparent" : "primary.dark",
          },
        }}
      >
        {added ? "Added" : "Add"}
      </Button>
    </ListItem>
  );
};

export default memo(UserItem);
