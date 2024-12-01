// Importing necessary Material-UI components for the Notifications dialog
import {
  Avatar, // Avatar component for user images
  Button, // Button component for actions
  Dialog, // Dialog component for modal
  DialogTitle, // DialogTitle for modal title
  ListItem, // ListItem for each notification
  Skeleton, // Skeleton for loading state
  Stack, // Stack for layout
  Typography, // Typography for text
  Divider, // Divider for separating list items
} from "@mui/material";

// Importing React and necessary hooks
import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing custom hooks and Redux actions
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation, // API mutation for accepting friend requests
  useGetNotificationsQuery, // API query for fetching notifications
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";
import { NotificationAddSharp } from "@mui/icons-material";

// Notifications component definition
const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc); // Selecting notification state
  const dispatch = useDispatch(); // Hook for dispatching Redux actions

  // Fetch notifications data
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  // Local state to manage requests
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (data?.allRequests) {
      setRequests(data.allRequests);
    }
  }, [data]);

  // Mutation for accepting friend requests
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  // Handler for accepting or rejecting friend requests
  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptRequest("Accepting...", { requestId: _id, accept }); // Execute mutation
    if (accept) {
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== _id));
      if (requests.length === 1) { // Check if it was the last request
        dispatch(setIsNotification(false)); // Close notifications dialog
      }
    }
  };

  // Handler for closing the notifications dialog
  const closeHandler = () => dispatch(setIsNotification(false));

  // Custom hook for handling errors
  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler} fullWidth PaperProps={{
      sx: {
        minHeight: '400px',
        maxHeight: '400px',
        overflow: 'hidden',
      }
    }}>
      <Stack p={2} spacing={2}>
        <DialogTitle textAlign="center">Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton variant="rectangular" height={100} />
        ) : isError ? (
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ height: '100%', flexGrow: 1 }}>
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
              <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ height: '100%', flexGrow: 1 }}>
                <NotificationAddSharp fontSize="large" />
                <Typography textAlign="center" variant="body1" color="text.secondary">
                  No notifications
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

// NotificationItem component for individual notifications
const NotificationItem = memo(({ sender, _id, handler }) => {
  // Add null check for sender
  if (!sender) return null;
  
  const { name = 'Unknown User', avatar = '' } = sender; // Provide default values
  
  return (
    <ListItem>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
      >
        <Avatar src={avatar} alt={name} /> {/* Will show first letter if avatar is empty */}

        <Stack direction="column" flexGrow={1}>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Sent you a friend request
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
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

export default Notifications; // Exporting Notifications component