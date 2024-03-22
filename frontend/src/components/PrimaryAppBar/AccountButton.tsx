import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import React, { useState } from "react";
///////////////////////

/////////////////////
const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu: () => JSX.Element = () => {
    return (
      <Menu
        open={isMenuOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleProfileMenuClose}
      >
        <MenuItem>
          <DarkModeSwitch />
        </MenuItem>
      </Menu>
    );
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  ///////////////////////
  return (
    <Box
      sx={{
        display: { xs: "flex" },
        cursor: "pointer",
      }}
    >
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircleIcon />
      </IconButton>
      {renderMenu()}
    </Box>
  );
};

export default AccountButton;
