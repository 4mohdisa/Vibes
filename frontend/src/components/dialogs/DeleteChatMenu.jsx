import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
  open={isDeleteMenu}
  onClose={closeHandler}
  anchorEl={deleteMenuAnchor.current}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "center",
    horizontal: "center",
  }}
  sx={{
    "& .MuiPaper-root": {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
  }}
>
  <Stack
    sx={{
      width: "12rem",
      padding: "0.55rem",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
      },
    }}
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
  >
    {isGroup ? (
      <>
        <ExitToAppIcon sx={{ color: "rgba(0, 0, 0, 0.7)" }} />
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.8)",
            fontWeight: "500",
          }}
        >
          Leave Group
        </Typography>
      </>
    ) : (
      <>
        <DeleteIcon sx={{ color: "rgba(255, 0, 0, 0.8)" }} />
        <Typography
          sx={{
            color: "rgba(255, 0, 0, 0.9)",
            fontWeight: "500",
          }}
        >
          Delete Chat
        </Typography>
      </>
    )}
  </Stack>
</Menu>
  );
};

export default DeleteChatMenu;
