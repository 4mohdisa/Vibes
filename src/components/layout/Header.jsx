// Importing necessary components from Material-UI
import {
  AppBar, // AppBar component for top navigation
  Backdrop, // Backdrop component for loading states
  Badge, // Badge component for notifications
  Box, // Box component for layout
  IconButton, // IconButton component for clickable icons
  Toolbar, // Toolbar component for organizing AppBar content
  Tooltip, // Tooltip component for displaying hints
} from "@mui/material";

// Importing React and hooks
import React, { Suspense, lazy, useState } from "react";

// Importing icons from Material-UI
import {
  Add as AddIcon, // Icon for adding new items
  Menu as MenuIcon, // Icon for menu
  Search as SearchIcon, // Icon for search
  Group as GroupIcon, // Icon for groups
  Logout as LogoutIcon, // Icon for logout
  Notifications as NotificationsIcon, // Icon for notifications
} from "@mui/icons-material";

// Importing navigation and HTTP libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Importing server configuration
import { server } from "../../constants/config";

// Importing toast notifications
import toast from "react-hot-toast";

// Importing Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile, // Action to set mobile view state
  setIsNewGroup, // Action to set new group state
  setIsNotification, // Action to set notification state
  setIsSearch, // Action to set search state
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

// Lazy loading components for better performance
const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

// Header component definition
const Header = () => {
  // Hook for navigation
  const navigate = useNavigate();

  // Hook for dispatching Redux actions
  const dispatch = useDispatch();

  // Selecting state from Redux store
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  // Function to handle mobile view toggle
  const handleMobile = () => dispatch(setIsMobile(true));

  // Function to open search dialog
  const openSearch = () => dispatch(setIsSearch(true));

  // Function to open new group dialog
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  // Function to open notifications dialog and reset count
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  // Function to navigate to groups page
  const navigateToGroup = () => navigate("/groups");

  // Function to handle user logout
  const logoutHandler = async () => {
    try {
      // Send GET request to logout endpoint
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      // Dispatch action to update user state
      dispatch(userNotExists());
      // Show success message
      toast.success(data.message);
    } catch (error) {
      // Show error message
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // State for menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Boolean to check if menu is open
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      {/* Container for AppBar */}
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            // Set background color to black
            bgcolor: "black",
          }}
        >
          {/* Toolbar for organizing AppBar content */}
          <Toolbar>
            {/* Logo image */}
            <Box
              component="img"
              sx={{ height: 40, display: { xs: "none", sm: "block" } }}
              alt="Logo"
              src="/vibes.png" // Logo image source
            />
            {/* Display menu icon on small screens */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {/* Mobile menu button */}
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            {/* Spacer to push icons to the right */}
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            {/* Container for action icons */}
            <Box>
              {/* Search icon */}
              <IconBtn
                title={"Search"}
                icon={<SearchIcon sx={{ color: "white" }} />}
                onClick={openSearch}
              />
              {/* New group icon */}
              <IconBtn
                title={"New Group"}
                icon={<AddIcon sx={{ color: "white" }} />}
                onClick={openNewGroup}
              />
              {/* Manage groups icon */}
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon sx={{ color: "white" }} />}
                onClick={navigateToGroup}
              />
              {/* Notifications icon */}
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon sx={{ color: "white" }} />}
                onClick={openNotification}
                value={notificationCount} // Badge value for notifications
              />
              {/* Logout action */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={isMenuOpen ? "primary-search-account-menu" : undefined}
                aria-haspopup="true"
                onClick={logoutHandler}
                color="inherit"
              >
                {/* Logout icon */}
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Lazy load search dialog */}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {/* Lazy load notifications dialog */}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {/* Lazy load new group dialog */}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

// Icon button component
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    // Tooltip for displaying hints
    <Tooltip title={title}>
      {/* IconButton component for clickable icons */}
      <IconButton color="inherit" size="large" onClick={onClick}>
        {/* Badge component for notifications */}
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

// Export Header component
export default Header;
