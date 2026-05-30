import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const { user: loggedInUser } = useSelector((state) => state.auth); // Get logged-in user
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    try {
      const response = await sendFriendRequest("Sending friend request...", {
        userId: id,
      });
      if (response?.data?.status) {
        const { status } = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, requestStatus: status } : user
          )
        );
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          // Filter out the logged-in user's profile
          const filteredUsers = data.users.filter(user => user._id !== loggedInUser._id);
          setUsers(filteredUsers);
        })
        .catch((e) => console.error(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, loggedInUser]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          minHeight: "300px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          bgcolor: "white",
        },
      }}
    >
      <Stack p={2} spacing={2}>
        {/* Title with Border */}
        <DialogTitle
          textAlign="center"
          sx={{
            color: "black",
            fontWeight: "600",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          Find People
        </DialogTitle>

        {/* Search Input Field */}
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
            },
          }}
        />

        {/* User List */}
        <List>
          {users.length > 0 ? (
            users.map((user, index) => (
              <React.Fragment key={user._id}>
                <UserItem
                  user={user}
                  handler={() => addFriendHandler(user._id)}
                  isAdded={user.isAdded || false} // Dynamically track added state
                  requestStatus={user.requestStatus}
                />
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ height: "200px" }}
            >
              <Typography variant="body1" color="text.secondary">
                No users found
              </Typography>
            </Stack>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
