import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminLogin(secretKey)).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log("Dispatching getAdmin");
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: "url('/Abstract-Background-min.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "16px",
          }}
        >
          <img
            src="/logo-black.svg"
            alt="Logo"
            style={{ width: "100px", marginBottom: "1rem" }}
          />
          <Typography
            variant="h5"
            style={{ color: "black", marginBottom: "1rem" }}
          >
            Admin Login
          </Typography>
          <form
            style={{
              width: "100%",
              marginTop: "0.5rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="dense"
              variant="outlined"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              InputProps={{
                style: { height: "40px", borderColor: "black" },
              }}
              InputLabelProps={{
                style: { color: "rgba(0,0,0,0.7)", fontSize: "1rem" },
              }}
            />

            <Button
              sx={{
                marginTop: "1rem",
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "grey",
                },
                borderRadius: "8px",
              }}
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
