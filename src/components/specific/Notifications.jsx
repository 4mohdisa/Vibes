import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAsyncMutation,
  useErrors,
} from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";
import { NotificationAddSharp } from "@mui/icons-material";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (data?.allRequests) {
      setRequests(data.allRequests);
    }
  }, [data]);

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptRequest("Accepting...", { requestId: _id, accept });
    if (accept) {
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== _id));
      if (requests.length === 1) {
        dispatch(setIsNotification(false));
      }
    }
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "white",
          borderRadius: "15px",
          overflow: "hidden",
          minHeight: "400px",
          maxHeight: "400px",
        },
      }}
    >
      <Stack p={2} spacing={2}>
        <DialogTitle
          textAlign="center"
          sx={{
            color: "black",
            fontWeight: "600",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          Notifications
        </DialogTitle>

        {isLoading ? (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{ height: "100%", flexGrow: 1 }}
  >
    <Skeleton variant="rectangular" height={100} width="80%" />
  </Stack>
) : isError ? (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{ height: "100%", flexGrow: 1 }}
  >
    <Typography color="error" textAlign="center">
      Error loading notifications. Please try again later.
    </Typography>
  </Stack>
) : (
  <>
    {isLoading ? (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{ height: "100%", width: "100%", flexGrow: 1 }}
  >
    <Skeleton variant="rectangular" height={100} width="80%" />
  </Stack>
) : isError ? (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{ height: "100%", width: "100%", flexGrow: 1 }}
  >
    <Typography color="error" textAlign="center">
      Error loading notifications. Please try again later.
    </Typography>
  </Stack>
) : (
  <>
    {requests?.length > 0 ? (
      requests.map(({ sender, _id }, index) => (
        <React.Fragment key={_id}>
          <NotificationItem
            sender={sender}
            _id={_id}
            handler={friendRequestHandler}
          />
          {index < requests.length - 1 && <Divider />}
        </React.Fragment>
      ))
    ) : (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ height: "100%", width: "100%", flexGrow: 1 }}
      >
        <NotificationAddSharp
          fontSize="large"
          sx={{ color: "rgba(0,0,0,0.5)" }}
        />
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ color: "rgba(0,0,0,0.6)" }}
        >
          No notifications
        </Typography>
      </Stack>
    )}
  </>
)}
  </>
)}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  if (!sender) return null;

  const { name = "Unknown User", avatar = "" } = sender;

  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar src={avatar} alt={name} />
        <Stack direction="column" flexGrow={1}>
          <Typography variant="body1" sx={{ color: "black", fontWeight: "600" }}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Sent you a friend request
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
            size="small"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderRadius: "20px",
              borderColor: "rgba(0, 0, 0, 0.6)",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            }}
            size="small"
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
