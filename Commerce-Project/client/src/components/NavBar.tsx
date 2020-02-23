import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar = () => {
  const { title } = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={title}>
          Commerce Bank
        </Typography>
        <IconButton
          aria-label="home"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          href="/dashboard"
          color="inherit"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          href="/profile"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          aria-label="Logout"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          href="/"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar >
  )
}

export default NavBar
