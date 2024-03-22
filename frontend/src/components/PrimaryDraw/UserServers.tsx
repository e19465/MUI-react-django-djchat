import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../api";
import { Link } from "react-router-dom";
import { Server } from "../../@types/server.d";
////////////////////////////////////////////////////////////////////

type Props = {
  isDrawerOpen: boolean;
};

// interface Server {
//   id: number;
//   name: string;
//   category: string;
//   icon: string;
// }

interface ServerChannelsProps {
  data: Server[];
}

///////////////////////////////////////////////////////////////////
const UserServers: React.FC<Props & ServerChannelsProps> = ({
  isDrawerOpen,
  data,
}) => {
  //////////////////////////////////////////////////////////////
  return (
    <>
      <Box
        sx={{
          height: "50px",
          width: "100%",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography
          sx={{
            display: isDrawerOpen ? "block" : "none",
            letterSpacing: "1px",
            fontWeight: 500,
          }}
        >
          Server
        </Typography>
      </Box>
      <List>
        {data?.map((item) => (
          <ListItem
            sx={{ display: "block" }}
            dense={true}
            disablePadding
            key={item.id}
          >
            <Link
              to={`/server/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 0,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar
                      alt="server icon"
                      src={`${MEDIA_URL}${item.icon}`}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: isDrawerOpen ? 1 : 0,
                  }}
                  primaryTypographyProps={{
                    sx: {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    },
                  }}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: "17px",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "textSecondary",
                        fontSize: "13px",
                      }}
                    >
                      {item.category}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserServers;
