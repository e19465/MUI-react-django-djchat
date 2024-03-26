import useWebSocket from "react-use-websocket";
import { useState } from "react";
import { useAuthServices } from "../services/AuthServices";
import useCrud from "../hooks/useCrud";
import { WS_ROOT } from "../api";
import { Server } from "../@types/server.d";

interface MessageInterface {
  sender: string;
  content: string;
  timestamp: string;
}

const useChatWebSocket = (channelId: string, serverId: string) => {
  const [message, setMessage] = useState("");
  const { logout, refreshAccessToken } = useAuthServices();
  const [newMessage, setNewMessage] = useState<MessageInterface[]>([]);
  const [reconnect, setReconnect] = useState(0);
  const maxConnectionAttempts = 4;

  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const websockerURL = channelId
    ? `${WS_ROOT}/${serverId}/${channelId}/`
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

  return {
    message,
    setMessage,
    newMessage,
    sendJsonMessage,
    serverId,
  };
};

export default useChatWebSocket;
