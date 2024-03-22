import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/server.d";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MessageIntChannels from "./MessageIntChannels";
import { useAuthServices } from "../../services/AuthServices";

interface MessageInterface {
  sender: string;
  content: string;
  timestamp: string;
}

interface ServerChannelProps {
  data: Server[];
}

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: unknown;
}

const MessageInterface = (props: ServerChannelProps) => {
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const theme = useTheme();
  const { data } = props;
  const [newMessage, setNewMessage] = useState<MessageInterface[]>([]);
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const server_name = data?.[0]?.name ?? "Server";
  const { logout, refreshAccessToken } = useAuthServices();
  const [reconnect, setReconnect] = useState(0);
  const maxConnectionAttempts = 4;
  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );
  const websockerURL = channelId
    ? `ws://localhost:8000/${serverId}/${channelId}/`
    : null;

  const { sendJsonMessage } = useWebSocket(websockerURL, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    },
    onClose: (event: CloseEvent) => {
      if (event.code === 4001) {
        console.log("Authentcation Error");
        refreshAccessToken().catch((error) => {
          if (error.response && error.reponse.status === 401) {
            logout();
          }
        });
      }

      console.log("Closed");
      setReconnect((prevState) => prevState + 1);
    },
    onError: () => {
      console.log("Error");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prevMsg) => [...prevMsg, data.new_message]);
      setMessage("");
    },
    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 4001 && reconnect >= maxConnectionAttempts) {
        return true;
      } else {
        setReconnect(0);
        return false;
      }
    },
    reconnectInterval: 1000,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  useEffect(() => {
    // Scroll to the last message whenever newMessage changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessage]);

  const formatTimeStamp = (timestamp: string): string => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  //////////////
  return (
    <>
      <MessageIntChannels data={data} />
      {channelId === undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            padding: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.5px",
                paddingX: 5,
                maxWidth: "600px",
              }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? "This is our home"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              overflow: "auto",
              padding: 0,
              height: `calc(100vh - 100px)`,
            }}
          >
            <List sx={{ width: "100%", backgroundColor: "background.paper" }}>
              {newMessage.map((message: MessageInterface, index: number) => (
                <ListItem
                  ref={index === newMessage.length - 1 ? lastMessageRef : null}
                  key={index}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="user image" />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "12px",
                      variant: "body2",
                    }}
                    primary={
                      <>
                        <Typography
                          component={"span"}
                          variant="body1"
                          color={"text.primary"}
                          sx={{ display: "inline", fontWeight: 600 }}
                        >
                          {message.sender}&nbsp;&nbsp;
                        </Typography>
                        <Typography
                          component={"span"}
                          variant="caption"
                          color={"textSecondary"}
                        >
                          {" at "}
                          {formatTimeStamp(message.timestamp)}
                        </Typography>
                      </>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "visible",
                            whiteSpace: "normal",
                            textOverflow: "clip",
                            wordBreak: "break-all",
                            display: "inline",
                            fontWeight: 400,
                            letterSpacing: "-0.2px",
                          }}
                          color={"text.primary"}
                          component={"span"}
                        >
                          {message.content}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={4}
                  sx={{ flexGrow: 1 }}
                  value={message}
                  // ref={scrollRef}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
