import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack
      width={w}
      direction="column"
      p="2rem"
      spacing="2rem"
      sx={{
        backgroundColor: "black", // Black background for the sidebar
        height: "100vh", // Full height
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="/logo.svg"
        alt="Logo"
        sx={{
          width: "100px",
          height: "auto",
          alignSelf: "center",
          marginBottom: "1rem",
        }}
      />

      {/* Sidebar Options */}
      <Stack spacing="1.5rem">
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              textDecoration: "none",
              color: location.pathname === tab.path ? "black" : "white",
              backgroundColor: location.pathname === tab.path ? "white" : "transparent",
              padding: "0.8rem 1.2rem",
              borderRadius: "8px", // Rounded corners for selected items
              transition: "all 0.3s ease",
            }}
          >
            <Stack direction="row" alignItems="center" spacing="1rem">
              {tab.icon}
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: location.pathname === tab.path ? "bold" : "normal",
                }}
              >
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}

        {/* Logout Option */}
        <Link
          onClick={logoutHandler}
          style={{
            textDecoration: "none",
            color: "white",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="1rem">
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: grayColor,
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
