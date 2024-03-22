import { useContext } from "react";
import { useTheme, IconButton, Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ColorModeContext } from "../../../context/DarkModeContext";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////
const DarkModeSwitch = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  /////////////////////////////////////////////////
  return (
    <>
      <Brightness4RoundedIcon sx={{ marginRight: "6px", fontSize: "20px" }} />
      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {theme.palette.mode} mode
      </Typography>
      <IconButton
        sx={{ m: 0, p: 0, pl: 2 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <ToggleOffIcon sx={{ fontSize: "2.5rem", p: 0 }} />
        ) : (
          <ToggleOnIcon sx={{ fontSize: "2.5rem" }} />
        )}
      </IconButton>
    </>
  );
};

export default DarkModeSwitch;
