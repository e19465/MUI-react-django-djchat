import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
// import React from "react";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import { MEDIA_URL } from "../../api";
import { Link, useParams } from "react-router-dom";
import { Server } from "../../@types/server.d";

///////////////////////////////////////////////

interface ServerChannelProps {
  data: Server[];
}

///////////////////////////////////////////////////
const ServerChannels = (props: ServerChannelProps) => {
  const { data } = props;
  const { serverId } = useParams();
  const theme = useTheme();
  // const isDarkMode = theme.palette.mode === "dark";
  const server_name = data?.[0]?.name ?? "Server";

  ///////////////////////////////////////
  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {server_name}
        </Typography>
      </Box>
      <List
        sx={{
          paddingY: "0px",
        }}
      >
        {data.flatMap((obj) =>
          obj.channel_server.map((item) => (
            <ListItem
              dense={true}
              key={item.id}
              disablePadding
              sx={{
                display: "block",
                maxHeight: "40px",
              }}
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: "48px" }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        textAlign={"start"}
                        paddingLeft={1}
                      >
                        {item.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
};

export default ServerChannels;
