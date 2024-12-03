import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
  ref={containerRef}
  boxSizing={"border-box"}
  padding={"1rem"}
  spacing={"1rem"}
  sx={{
    height: "90%",
    overflowX: "hidden",
    overflowY: "auto",
    backgroundImage: `url("/chat-background.png")`,
    backgroundColor: "rgba(0, 0, 0, 0.90)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }}
      >
  {/* Display this message if there are no messages */}
  {allMessages.length === 0 && (
    <Typography
      sx={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(255, 255, 255, 0.5)", // Light black color
        fontSize: "1.2rem",
        textAlign: "center",
        fontWeight: "500",
      }}
    >
      {chatDetails?.data?.chat?.isGroup
        ? `Start chat in ${chatDetails?.data?.chat?.name}`
        : `Chat with ${chatDetails?.data?.chat?.name}`}
    </Typography>
  )}

  {allMessages.map((i) => (
    <MessageComponent key={i._id} message={i} user={user} />
  ))}

  {userTyping && <TypingLoader />}

  <div ref={bottomRef} />
      </Stack>

      <form
  style={{
    height: "10%",
    backgroundColor: "black", // Black background for the form
    borderTop: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for separation
  }}
  onSubmit={submitHandler}
>
  <Stack
    direction={"row"}
    height={"100%"}
    padding={"1rem"}
    alignItems={"center"}
    position={"relative"}
  >
    {/* Attach File Button */}
    <IconButton
      sx={{
        position: "absolute",
        left: "1rem",
        color: "white", // White icon for dark background
        "&:hover": {
          color: "rgba(255, 165, 0, 0.8)", // Orange hover effect
        },
      }}
      onClick={handleFileOpen}
    >
      <AttachFileIcon />
    </IconButton>

    {/* Message Input Box */}
    <input
      type="text"
      placeholder="Type your message here..."
      value={message}
      onChange={messageOnChange}
      style={{
        flex: 1,
        padding: "0.8rem 1.2rem",
        marginLeft: "3rem", // Space to avoid overlap with the attach button
        marginRight: "1rem", // Space before the send button
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle background for input box
        color: "white", // White text
        border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
        borderRadius: "20px", // Rounded corners
        outline: "none", // No focus outline
        fontSize: "1rem",
        fontFamily: "inherit",
      }}
    />

    {/* Send Button */}
    <IconButton
      type="submit"
      sx={{
        bgcolor: "white", // Orange background for the button
        color: "black", // White icon color
        padding: "0.8rem",
        borderRadius: "50%", // Circular button
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.9)", // Slightly darker orange hover effect
        },
      }}
    >
      <SendIcon color="black" />
    </IconButton>
  </Stack>
</form>


      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);