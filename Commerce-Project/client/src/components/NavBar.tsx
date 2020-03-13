import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, List, Divider, Drawer, ListItemText, ListItemIcon, ListItem, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBalance from '@material-ui/icons/AccountBalance';
import { Theme as commerceTheme } from './Theme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    menu: {
      marginRight: '1rem'
    },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start'
    },
    collapseIcon: {
      color: commerceTheme.palette.primary.main,
    }
  })
);

const NavBar = () => {
  const { title, hide, drawer, drawerHeader, drawerPaper, menu, appBar, appBarShift, collapseIcon } = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color='secondary' className={clsx(appBar, {
        [appBarShift]: open,
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && hide)}
          >
            <MenuIcon className={menu} />
          </IconButton>
          <img alt='commerce bank' src='https://www.commercebank.com/-/media/cb/images/masthead/site-logo/commerce-bank-logo-2x.png?sc=0.5&hash=54EC619B6CADAD3482F8E513AFC8F14010659DEE' />
          <div className={title}></div>
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
      <Drawer
        className={drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: drawerPaper,
        }}
      >
        <div className={drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className={collapseIcon} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary='Account Profile' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary='Checking Account' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary='Savings Account' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary='Money Market Account' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Log Out' />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default NavBar
