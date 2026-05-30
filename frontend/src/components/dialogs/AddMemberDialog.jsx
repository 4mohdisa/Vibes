import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);
  return (
    <Dialog
  open={isAddMember}
  onClose={closeHandler}
  PaperProps={{
    sx: {
      backgroundColor: "white", // White background for the dialog
      borderRadius: "12px", // Rounded corners for the dialog
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for the dialog
    },
  }}
>
  <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
    <DialogTitle
      textAlign={"center"}
      sx={{
        color: "black", // Black text for title
        fontWeight: "600",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Border bottom for separation
      }}
    >
      Add Member
    </DialogTitle>

    <Stack spacing={"1rem"}>
      {isLoading ? (
        <Skeleton variant="rectangular" height={50} />
      ) : data?.friends?.length > 0 ? (
        data?.friends?.map((i) => (
          <UserItem
            key={i._id}
            user={i}
            handler={selectMemberHandler}
            isAdded={selectedMembers.includes(i._id)}
          />
        ))
      ) : (
        <Typography textAlign={"center"} sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
          No Friends
        </Typography>
      )}
    </Stack>

    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      spacing={2}
    >
      {/* Cancel Button */}
      <Button
        color="error"
        onClick={closeHandler}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          border: "1px solid rgba(255, 0, 0, 0.7)",
          color: "rgba(255, 0, 0, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          },
        }}
        variant="outlined"
      >
        Cancel
      </Button>

      {/* Submit Changes Button */}
      <Button
        onClick={addMemberSubmitHandler}
        variant="contained"
        disabled={isLoadingAddMembers}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        Submit Changes
      </Button>
    </Stack>
  </Stack>
</Dialog>
  );
};

export default AddMemberDialog;
