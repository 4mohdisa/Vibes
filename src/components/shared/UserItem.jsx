import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, Button, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        padding: "10px 16px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
        ...styling,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        {/* Avatar */}
        <Avatar
          src={transformImage(avatar)}
          alt={name}
          sx={{ width: 40, height: 40 }}
        />

        {/* User Name */}
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "black",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>

        {/* Action Button */}
        <Button
          size="small"
          sx={{
            width: "100%",
            maxWidth: "100px",
            borderRadius: "8px",
            backgroundColor: isAdded ? "transparent" : "black",
            border: isAdded ? "1px solid rgba(0, 0, 0, 0.6)" : "none",
            color: isAdded ? "rgba(0, 0, 0, 0.6)" : "white",
            "&:hover": {
              backgroundColor: isAdded ? "transparent" : "rgba(0, 0, 0, 0.8)",
              borderColor: isAdded ? "rgba(0, 0, 0, 0.8)" : "none",
            },
            textTransform: "none",
            padding: "6px 12px",
          }}
          variant={isAdded ? "outlined" : "contained"}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? "Added" : "Add"}
        </Button>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
