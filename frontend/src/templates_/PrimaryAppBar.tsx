import { AppBar, Link, Toolbar, Typography, useTheme } from "@mui/material";

const PrimaryAppBar = () => {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ letterSpacing: "-0.5px", fontWeight: 700 }}
          >
            DJ
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{ fontSize: "12px", fontWeight: 500 }}
            >
              CHAT
            </Typography>
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;