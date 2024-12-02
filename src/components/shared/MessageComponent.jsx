import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: sameSender ? "flex-end" : "flex-start",
        marginBottom: "1rem",
      }}
    >
      {/* Sender's Name and Timestamp */}
      {!sameSender && (
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: "600",
            color: lightBlue, // Sender's name in light blue
            marginBottom: "0.3rem",
          }}
        >
          {sender.name}
        </Typography>
      )}

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Light black background
          color: "white", // White text
          borderRadius: "10px",
          padding: "0.8rem",
          maxWidth: "70%",
          wordBreak: "break-word", // Ensure long text wraps properly
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Subtle shadow
        }}
      >

        {/* Message Content */}
        {content && (
          <Typography
            sx={{
              fontSize: "0.95rem",
              lineHeight: "1.5",
            }}
          >
            {content}
          </Typography>
        )}

        {/* Attachments */}
        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box
                key={index}
                sx={{
                  marginTop: "0.5rem",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "white",
                    textDecoration: "underline", // Emphasize attachment links
                    fontSize: "0.85rem",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
      </motion.div>

      <Typography
        sx={{
          fontSize: "10px",
          color: "rgba(255, 255, 255, 0.6)", // Subtle white for timestamp
          marginTop: "0.3rem",
        }}
      >
        {timeAgo}
      </Typography>
    </Box>
  );
};

export default memo(MessageComponent);
