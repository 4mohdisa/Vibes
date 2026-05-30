import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PersonAddAlt1 } from "@mui/icons-material";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((member) => member !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Please select at least 3 members");

    newGroup("Creating New Group...", {
      name: groupName,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      onClose={closeHandler}
      open={isNewGroup}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "white",
          borderRadius: "12px",
        },
      }}
    >
      <Stack p={3} spacing={2}>
        <DialogTitle
          textAlign="center"
          sx={{
            color: "black",
            fontWeight: "bold",
            borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
            paddingBottom: "8px",
          }}
        >
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            },
          }}
        />

        <Typography
          variant="body1"
          sx={{ color: "rgba(0, 0, 0, 0.7)", fontWeight: "bold" }}
        >
          Members
        </Typography>

        <Stack spacing={1} sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={100} />
          ) : data?.friends?.length > 0 ? (
            data.friends.map((user, index) => (
              <React.Fragment key={user._id}>
                <UserItem
                  user={user}
                  handler={() => selectMemberHandler(user._id)}
                  isAdded={selectedMembers.includes(user._id)}
                />
                {index < data.friends.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ height: "200px" }}
            >
              <PersonAddAlt1 fontSize="large" sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
              <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                No users available
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
              color: "black",
              borderColor: "black",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={closeHandler}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
