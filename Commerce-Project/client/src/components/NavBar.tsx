import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = () => {

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Commerce Bank
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar