import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "1.5rem",
        margin: "2rem 0",
        borderRadius: "16px",
        backgroundColor: "white", // White background
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        justifyContent={"space-between"}
      >
        {/* Admin Icon */}
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
            color: "black", // Black icon color
          }}
        />
  
        {/* Search Field */}
        <SearchField
          placeholder="Search..."
          sx={{
            width: "100%",
            maxWidth: "400px", // Restrict search bar width
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Light gray background
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            color: "black", // Black text
            "::placeholder": {
              color: "rgba(0, 0, 0, 0.6)", // Subtle placeholder color
            },
          }}
        />
  
        {/* Search Button */}
        <CurveButton
          sx={{
            backgroundColor: "black", // Black button background
            color: "white", // White text color
            borderRadius: "8px", // Rounded button
            padding: "0.5rem 1rem",
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)", // Slightly lighter hover effect
            },
          }}
        >
          Search
        </CurveButton>
  
        <Box flexGrow={1} />
  
        {/* Date Display */}
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          sx={{
            color: "black", // Black text
            fontSize: "1rem",
          }}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
  
        {/* Notifications Icon */}
        <NotificationsIcon
          sx={{
            fontSize: "2rem",
            color: "black", // Black icon color
            ":hover": {
              color: "rgba(0, 0, 0, 0.8)", // Slightly lighter hover effect
            },
          }}
        />
      </Stack>
    </Paper>
  );
  


  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        margin: "2rem 0",
        padding: "1rem",
      }}
    >
      <Widget
        title={"Users"}
        value={stats?.usersCount}
        Icon={<PersonIcon sx={{ fontSize: "3rem", color: "black" }} />}
      />
      <Widget
        title={"Chats"}
        value={stats?.totalChatsCount}
        Icon={<GroupIcon sx={{ fontSize: "3rem", color: "black" }} />}
      />
      <Widget
        title={"Messages"}
        value={stats?.messagesCount}
        Icon={<MessageIcon sx={{ fontSize: "3rem", color: "black" }} />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
  {loading ? (
    <Skeleton
      height={"100vh"}
      sx={{
        bgcolor: "rgba(255,255,255,0.08)",
      }}
    />
  ) : (
    <Container
      component={"main"}
      sx={{
        bgcolor: "rgba(255,255,255, 1)", // Dark background for the layout
        borderRadius: "16px",
        padding: "2rem",
        color: "white", // White text for better contrast
      }}
    >
      {/* Appbar */}
      {Appbar}

      {/* Main Section */}
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={{
          xs: "center",
          lg: "stretch",
        }}
        sx={{ gap: "2rem" }}
      >
        {/* Last Messages */}
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.08)", // Slightly transparent background
            padding: "2rem 3.5rem",
            borderRadius: "1rem",
            color: "white", // Ensure text color is white
            width: "100%",
            maxWidth: "45rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
          }}
        >
          <Typography
            margin={"2rem 0"}
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "white", // White text
            }}
          >
            Last Messages
          </Typography>

          <LineChart value={stats?.messagesChart || []} />
        </Paper>

        {/* Doughnut Chart */}
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            padding: "1rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%" },
            position: "relative",
            maxWidth: "25rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <DoughnutChart
            labels={["Single Chats", "Group Chats"]}
            value={[
              stats?.totalChatsCount - stats?.groupsCount || 0,
              stats?.groupsCount || 0,
            ]}
          />

          <Stack
            position={"absolute"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"0.5rem"}
            width={"100%"}
            height={"100%"}
          >
            <GroupIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Vs
            </Typography>
            <PersonIcon sx={{ color: "white", fontSize: "1.5rem" }} />
          </Stack>
        </Paper>
      </Stack>

      {/* Widgets Section */}
      {Widgets}
    </Container>
  )}
</AdminLayout>

  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      backgroundColor: "white", // Pure white background for the widget
      color: "black", // Text color for white background
      padding: "2rem",
      borderRadius: "16px", // Rounded corners
      textAlign: "center",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Subtle shadow effect for contrast
    }}
  >
    {/* Icon */}
    <Box
      sx={{
        width: "4rem",
        height: "4rem",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.05)", // Light gray background for the icon
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black", // Icon color
        fontSize: "1.8rem",
      }}
    >
      {Icon}
    </Box>

    {/* Value */}
    <Typography
      sx={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "black", // Main text color
      }}
    >
      {value || 0}
    </Typography>

    {/* Title */}
    <Typography
      sx={{
        fontSize: "1rem",
        fontWeight: "500",
        color: "rgba(0, 0, 0, 0.7)", // Subtle dark gray for title
      }}
    >
      {title}
    </Typography>
  </Paper>
);


export default Dashboard;
