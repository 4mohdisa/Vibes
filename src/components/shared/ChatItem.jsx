import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert = { count: 0 },
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
        textDecoration: "none",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "rgba(0, 0, 0, 0.85)" : "unset",
          color: "white",
          position: "relative",
          padding: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Avatar with Online Indicator */}
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <AvatarCard avatar={avatar} />
          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                border: "2px solid black",
              }}
            />
          )}
        </Box>

        {/* Chat Information */}
        <Stack>
          {/* Username */}
          <Typography
            sx={{
              fontWeight: "500", // Semibold
              color: "white",
            }}
          >
            {name}
          </Typography>

          {/* New Message Alert */}
          {newMessageAlert?.count > 0 && (
            <Typography
              sx={{
                fontSize: "0.875rem", // Small text
                color: "rgba(255,255,255,0.6)", // Light text color
              }}
            >
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
