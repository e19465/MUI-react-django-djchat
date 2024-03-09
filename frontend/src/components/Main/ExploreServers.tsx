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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../api";
import { Link, useParams } from "react-router-dom";
////////////////////////////////////////////////////////
interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
  banner: string;
}
///////////////////////////////////////////////////////
const ExploreServers = () => {
  const { categoryName } = useParams();
  const url = categoryName
    ? `/server/select/?category=${categoryName}`
    : `/server/select`;
  const { dataCRUD, fetchData } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);
  ////////////////////////////////////////////////////
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3 }}>
        <Typography
          variant="h3"
          noWrap
          component={"h1"}
          sx={{
            display: {
              sm: "block",
              fontWeight: 700,
              letterSpacing: "-2px",
              textTransform: "capitalize",
            },
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          {categoryName ? categoryName : "Popular Channels"}
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component={"h6"}
          color={"textSecondary"}
          sx={{
            display: {
              sm: "block",
              fontWeight: 400,
              letterSpacing: "0.5px",
            },
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          {categoryName
            ? `channels talking about ${categoryName}`
            : "checkout some of our popular channels"}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ pt: 4, pb: 1, fontWeight: 500 }}>
        Recommended Channels
      </Typography>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        {dataCRUD?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                backgroundImage: "none",
                borderRadius: 0,
              }}
            >
              <Link
                to={`/server/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component={"img"}
                  image={
                    item.banner
                      ? `${MEDIA_URL}${item.banner}`
                      : "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt="random"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    padding: 0,
                    "&:last-child": { paddingBottom: 0 },
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <ListItemAvatar sx={{ minWidth: "50px" }}>
                          <Avatar
                            alt="server-icon"
                            src={`${MEDIA_URL}${item.icon}`}
                          />
                        </ListItemAvatar>
                      </ListItemIcon>
                      <ListItemText
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
                            textAlign="start"
                            sx={{
                              fontWeight: 700,
                              lineHeight: 1.2,
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2">
                            {item.category}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExploreServers;
