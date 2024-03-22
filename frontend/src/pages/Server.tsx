import { Box } from "@mui/material";
import PrimaryAppBar from "../templates_/PrimaryAppBar";
import PrimaryDraw from "../templates_/PrimaryDraw";
import SecondaryDraw from "../templates_/SecondaryDraw";
import Main from "../templates_/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";
import { useNavigate, useParams } from "react-router-dom";
import { Server } from "../@types/server.d";
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
//////////////////////////////////////////////////////

/////////////////////////////////////////////
const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { fetchData, dataCRUD, error, isLoading } = useCrud<Server>(
    [],
    `/server/select/?server_id=${serverId}`
  );
  useEffect(() => {
    fetchData();
  }, []);

  if (error != null && error.message == "400") {
    navigate("/");
    return null;
  }

  // check if channel ID is valid by searching for it in the data fetched from the API
  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    } else {
      return dataCRUD.some((server) =>
        server.channel_server.some(
          (channel) => channel.id === parseInt(channelId)
        )
      );
    }
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, serverId, navigate]);
  ///////////////////////////////////
  return (
    <Box sx={{ display: "flex" }}>
      <PrimaryAppBar />
      <PrimaryDraw>
        <UserServers isDrawerOpen={false} data={dataCRUD} />
      </PrimaryDraw>
      <SecondaryDraw>
        <ServerChannels data={dataCRUD} />
      </SecondaryDraw>
      <Main>
        <MessageInterface data={dataCRUD} />
      </Main>
    </Box>
  );
};

export default Server;
