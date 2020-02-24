import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
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
        <Button variant="contained" href="/register">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
