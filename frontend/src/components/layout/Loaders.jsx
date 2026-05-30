import { Grid, Skeleton, Stack, Box } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"calc(100vh - 4rem)"}
      spacing={2}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent background
      }}
    >
      {/* Sidebar Loader */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton
          variant="rectangular"
          height={"100%"}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)", // 70% transparent white
            borderRadius: "8px",
          }}
        />
      </Grid>

      {/* Main Content Loader */}
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={2}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={"5rem"}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // 70% transparent white
                borderRadius: "8px",
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar Loader */}
      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton
          variant="rectangular"
          height={"100%"}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)", // 70% transparent white
            borderRadius: "8px",
          }}
        />
      </Grid>
    </Grid>
  );
};


export { LayoutLoader };
