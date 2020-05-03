import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  Divider,
  Drawer,
  Tooltip,
  ListItemText,
  ListItemIcon,
  ListItem,
  Theme,
  Typography
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import store from "store";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBalance from '@material-ui/icons/AccountBalance';
import { Theme as commerceTheme } from './Theme';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { AttachMoney, CreditCard, Security, HelpOutline, Notifications } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    image: {
      marginLeft: '1rem'
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
    iconColor: {
      color: commerceTheme.palette.primary.main,
    }
  })
);

const NavBar = () => {
  const { title, hide, drawer, drawerHeader, drawerPaper, image, appBar, appBarShift, iconColor } = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboardLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/dashboard' ref={ref} {...itemProps} />
      )),
    []
  );

  const profileLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/profile' ref={ref} {...itemProps} />
      )),
    []
  );

  const checkingLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/checking' ref={ref} {...itemProps} />
      )),
    []
  );

  const savingsLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/savings' ref={ref} {...itemProps} />
      )),
    []
  );

  const moneyMarketLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/moneyMarket' ref={ref} {...itemProps} />
      )),
    []
  );

  const logoutLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/' ref={ref} {...itemProps} />
      )),
    []
  );

  const notificationLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/notifications' ref={ref} {...itemProps} />
      )),
    []
  );

  const username = store.get('username');

  return (
    <>
      <AppBar position="fixed" color='secondary' className={clsx(appBar, {
        [appBarShift]: open,
      })}>
        <Toolbar>
          <Tooltip title='Menu'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(open && hide)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <img alt='commerce bank' className={image} src='https://www.commercebank.com/-/media/cb/images/masthead/site-logo/commerce-bank-logo-2x.png?sc=0.5&hash=54EC619B6CADAD3482F8E513AFC8F14010659DEE' />
          <div className={title}></div>
          {
            (username !== undefined && username !== "") ?
              <>
                <Tooltip title='Dashboard'>
                  <IconButton
                    aria-label="home"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    component={dashboardLink}
                    color="primary"
                  >
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Notifications'>
                  <IconButton
                    aria-label="notifications"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    component={notificationLink}
                    color="primary"
                  >
                    <Notifications />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Manage Profile'>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    component={profileLink}
                    color="primary"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Logout'>
                  <IconButton
                    aria-label="Logout"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    component={logoutLink}
                    color="primary"
                    onClick={() => store.remove('username')}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </>
              : null
          }
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
        {/* Drawer */}
        <div className={drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className={iconColor} />
          </IconButton>
          <Typography>
            Collapse Menu
          </Typography>
        </div>
        {
          (username !== undefined && username !== "") ?
            <>
              <Divider />
              <List>
                <ListItem button component={dashboardLink}>
                  <ListItemIcon className={iconColor}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button component={profileLink}>
                  <ListItemIcon className={iconColor}>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='Account Profile' />
                </ListItem>
                <ListItem button component={notificationLink}>
                  <ListItemIcon className={iconColor}>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText primary='Notifications' />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button component={checkingLink}>
                  <ListItemIcon className={iconColor}>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary='Checking Account' />
                </ListItem>
                <ListItem button component={savingsLink}>
                  <ListItemIcon className={iconColor}>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary='Savings Account' />
                </ListItem>
                <ListItem button component={moneyMarketLink}>
                  <ListItemIcon className={iconColor}>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary='Money Market Account' />
                </ListItem>
              </List>
              <Divider />
            </>
            : null
        }
        <List>
          <ListItem button>
            <ListItemIcon className={iconColor}>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary='Borrow' />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={iconColor}>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary='Cards' />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={iconColor}>
              <Security />
            </ListItemIcon>
            <ListItemText primary='Insurance' />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={iconColor}>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary='Help' />
          </ListItem>
        </List>
        {
          (username !== undefined && username !== "") ?
            <>
              <List>
                <Divider />
                <List>
                  <ListItem button component={logoutLink} onClick={() => store.remove('username')}>
                    <ListItemIcon className={iconColor}>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Log Out' />
                  </ListItem>
                </List>
              </List>
            </>
            : null
        }
      </Drawer>
    </>
  )
}

export default NavBar
