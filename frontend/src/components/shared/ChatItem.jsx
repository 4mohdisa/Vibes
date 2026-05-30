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
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
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
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography               sx={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '500'
              }}
              >{name}</Typography>
          {newMessageAlert && (
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.60)',
                fontSize: '12px',
                fontWeight: '400'
              }}
            >
              {newMessageAlert.count} New Message
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);