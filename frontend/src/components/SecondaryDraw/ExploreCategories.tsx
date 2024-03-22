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
import useCrud from "../../hooks/useCrud";
import React, { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../api";
import { Link } from "react-router-dom";

///////////////////////////////////////////////

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

///////////////////////////////////////////////////
const ExploreCategories = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { fetchData, dataCRUD, error, isLoading } = useCrud<Category>(
    [],
    "/server/category/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //     console.log(dataCRUD);
  //   }, [dataCRUD]);

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
        Explore
      </Box>
      <List
        sx={{
          paddingY: "0px",
        }}
      >
        {dataCRUD.map((item) => (
          <ListItem
            dense={true}
            key={item.id}
            disablePadding
            sx={{
              display: "block",
            }}
          >
            <Link
              to={`/explore/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: "48px" }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      src={`${MEDIA_URL}${item.icon}`}
                      alt="server icon"
                      style={{
                        width: "25px",
                        height: "25px",
                        margin: "auto",
                        display: "block",
                        filter: isDarkMode ? "invert(100%)" : "none",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
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
        ))}
      </List>
    </>
  );
};

export default ExploreCategories;
