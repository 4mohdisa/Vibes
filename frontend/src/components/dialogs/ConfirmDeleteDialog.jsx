import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
<Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    sx: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.25rem",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      color: "black",
    }}
  >
    Confirm Delete
  </DialogTitle>
  <DialogContent>
    <DialogContentText
      sx={{
        fontSize: "1rem",
        color: "rgba(0, 0, 0, 0.8)",
        textAlign: "center",
        margin: "1rem 0",
      }}
    >
      Are you sure you want to delete this group?
    </DialogContentText>
  </DialogContent>
  <DialogActions
    sx={{
      display: "flex",
      justifyContent: "space-evenly",
      padding: "1rem",
    }}
  >
    <Button
      onClick={handleClose}
      variant="outlined"
      sx={{
        borderRadius: "25px",
        padding: "0.5rem 1.5rem",
        fontWeight: "500",
        color: "rgba(0, 0, 0, 0.8)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      No
    </Button>
    <Button
      onClick={deleteHandler}
      variant="contained"
      color="error"
      sx={{
        borderRadius: "25px",
        padding: "0.5rem 1.5rem",
        fontWeight: "500",
        color: "white",
        "&:hover": {
          backgroundColor: "darkred",
        },
      }}
    >
      Yes
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default ConfirmDeleteDialog;
