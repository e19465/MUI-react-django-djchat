import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MEDIA_URL } from "../../api";
import { Server } from "../../@types/server.d";
import { useParams } from "react-router-dom";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ServerChannelProps {
  data: Server[];
}

const MessageIntChannels = (props: ServerChannelProps) => {
  const theme = useTheme();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data } = props;
  const { serverId, channelId } = useParams();
  const channelName =
    data
      ?.find((server) => server.id === Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))
      ?.name || "home";
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          height: theme.primaryAppBar.height,
          //   display: "flex",
          //   alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component={"div"}>
            {channelName}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setIsOpenSideMenu((prev) => !prev)}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={isOpenSideMenu && isSmallScreen}
            onClose={() => setIsOpenSideMenu((prev) => !prev)}
          >
            <Box
              sx={{
                paddingTop: `${theme.primaryAppBar.height}px`,
                minWidth: 200,
              }}
              role="presentation"
              onClick={() => setIsOpenSideMenu((prev) => !prev)}
              onKeyDown={() => setIsOpenSideMenu((prev) => !prev)}
            >
              <ServerChannels data={data} />
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageIntChannels;
