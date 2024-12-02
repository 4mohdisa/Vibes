import React, { Suspense } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Badge,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../constants/config";
import AvatarCard from "../shared/AvatarCard";
import { resetNotificationCount } from "../../redux/reducers/chat";
import { setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { userNotExists } from "../../redux/reducers/auth";
import { useChatDetailsQuery } from "../../redux/api/api";

const SearchDialog = React.lazy(() => import("../specific/Search"));
const NotifcationDialog = React.lazy(() => import("../specific/Notifications"));
const NewGroupDialog = React.lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const { user } = useSelector((state) => state.auth);

  // Redux states for dialogs
  const { notificationCount } = useSelector((state) => state.chat);
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  const { data: chatData } = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const otherUser = chatData?.chat?.members?.find(
    (member) => member._id !== user?._id
  );

  const currentChat = chatData?.chat
    ? {
        avatar: chatData.chat.groupChat
          ? Array.isArray(chatData.chat.avatar)
            ? chatData.chat.avatar
            : [chatData.chat.avatar].filter(Boolean)
          : Array.isArray(otherUser?.avatar)
          ? otherUser.avatar
          : [otherUser?.avatar].filter(Boolean),
        name: chatData.chat.groupChat
          ? chatData.chat.name
          : otherUser?.name || "",
        username: !chatData.chat.groupChat ? otherUser?.username || "" : "",
        groupChat: chatData.chat.groupChat,
      }
    : null;

  const handleSearch = () => dispatch(setIsSearch(true));
  const handleNewGroup = () => dispatch(setIsNewGroup(true));
  const handleNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left Section: Application Logo */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Logo"
                sx={{ height: 60, cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Box>

            {/* Center Section: Profile Information */}
            {currentChat && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                sx={{
                  flex: 2,
                  justifyContent: "flex-start",
                  paddingLeft: 0,
                }}
              >
                <AvatarCard avatar={currentChat.avatar} />
                <Stack>
                  <Typography variant="h6" fontWeight={600}>
                    {currentChat.name}
                  </Typography>
                  {!currentChat.groupChat && currentChat.username && (
                    <Typography variant="subtitle2" color="text.secondary">
                      @{currentChat.username}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}

            {/* Right Section: Action Buttons */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Tooltip title="Search">
                <IconButton onClick={handleSearch} sx={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton onClick={handleNewGroup} sx={{ color: "white" }}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Groups">
                <IconButton
                  onClick={() => navigate("/groups")}
                  sx={{ color: "white" }}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleNotification}
                  sx={{ color: "white" }}
                >
                  <Badge 
                    badgeContent={notificationCount}
                    color="success"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#44b700",
                        boxShadow: `0 0 0 2px white`,
                        fontSize: '10px',
                        height: '16px',
                        minWidth: '16px',
                        padding: '0 4px'
                      }
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={logoutHandler} sx={{ color: "white" }}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Dialog Components */}
      {isSearch && (
        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>}>
          <NotifcationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;