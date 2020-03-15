import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import store from "store";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar = () => {
  const { title } = useStyles();

  const username = store.get('username');

  return (
    <AppBar position="relative" color='secondary'>
      <Toolbar>
        <img alt='commerce bank' src='https://www.commercebank.com/-/media/cb/images/masthead/site-logo/commerce-bank-logo-2x.png?sc=0.5&hash=54EC619B6CADAD3482F8E513AFC8F14010659DEE' />
        <div className={title}></div>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {
          username !== undefined ?
            <>
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
                onClick={() => {
                  store.remove('username');
                }}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </>
            : null
        }
      </Toolbar>
    </AppBar >
  )
}

export default NavBar
