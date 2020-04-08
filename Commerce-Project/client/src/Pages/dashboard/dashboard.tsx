import React from 'react'
import { Typography, Divider, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import store from "store";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Edit } from '@material-ui/icons';
import { Theme, NotificationCard } from '../../components';
import apis from '../../api';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      marginTop: '4rem',
      height: '100%'
    },
    divider: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    expansion: {
      marginBottom: '2rem'
    },
    expansionHeader: {
      flexBasis: '33.33%'
    },
    balance: {
      color: Theme.palette.primary.main,
      fontWeight: 700,
      marginLeft: '.25rem',
      paddingTop: '0.1875rem',
      flexGrow: 1
    },
    balancePadding: {
      paddingTop: '0.1875rem'
    },
    EditIcon: {
      padding: 0
    }
  })
);

const DashBoard = () => {
  // styles
  const { paper, divider, expansion, expansionHeader, balance, balancePadding, EditIcon } = useStyles()

  // Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [checking, setChecking] = React.useState(0);
  const [savings, setSavings] = React.useState(0);
  const [user, setUsername] = React.useState('');

  const [hideNotificationOne, setRemoveNotificationOne] = React.useState(false);
  const [hideNotificationTwo, setRemoveNotificationTwo] = React.useState(false);
  const [hideNotificationThree, setRemoveNotificationThree] = React.useState(false);

  const username = store.get('username');

  const getBalances = async () => {
    let check = await apis.getCheckingBalance(username);
    let save = await apis.getSavingsBalance(username);
    let money = await apis.getMoneyMarketBalance(username);
    let name = await apis.getUserById(store.get('username'));

    setChecking(check.data.data[0].amount);
    setSavings(save.data.data[0].amount);
    setMoneyMarket(money.data.data[0].amount);
    setUsername(name.data.data.firstName);
  }

  React.useEffect(() => {
    getBalances();
  })

  const checkingDetail = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/checking' ref={ref} {...itemProps} />
      )),
    []
  );

  const savingsDetail = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/savings' ref={ref} {...itemProps} />
      )),
    []
  );

  const moneyMarketDetail = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/moneyMarket' ref={ref} {...itemProps} />
      )),
    []
  );

  const removeNotificationOne = () => {
    return setRemoveNotificationOne(true)
  }

  const removeNotificationTwo = () => {
    return setRemoveNotificationTwo(true)
  }

  const removeNotificationThree = () => {
    return setRemoveNotificationThree(true)
  }

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Welcome back, {user}</Typography>
      <Divider className={divider} />
      {
        hideNotificationOne === false ?
          <>
            <NotificationCard message='Low Balance' onClick={removeNotificationOne} />
          </>
          : false
      }
      {
        hideNotificationTwo === false ?
          <>
            <NotificationCard message='Large Withdrawal' onClick={removeNotificationTwo} />
          </>
          : false
      }
      {
        hideNotificationThree === false ?
          <>
            <NotificationCard message='Large Deposit' onClick={removeNotificationThree} />
          </>
          : false
      }
      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel1" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Checking Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $ </Typography>
          <Typography variant='subtitle1' className={balance}>{checking}</Typography>
          <Tooltip title='View Checking Account'>
            <IconButton
              className={EditIcon}
              aria-label="View Checking Account"
              aria-controls="expansion-action"
              aria-haspopup="true"
              component={checkingDetail}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel2" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Savings Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $ </Typography>
          <Typography variant='subtitle1' className={balance}>{savings}</Typography>
          <Tooltip title='View Savings Account'>
            <IconButton
              className={EditIcon}
              aria-label="View Savings Account"
              aria-controls="expansion-action"
              aria-haspopup="true"
              component={savingsDetail}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel3" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Money Market Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $</Typography>
          <Typography variant='subtitle1' className={balance}>{moneyMarket}</Typography>
          <Tooltip title='View Money Market Account'>
            <IconButton
              className={EditIcon}
              aria-label="View Money Market Account"
              aria-controls="expansion-action"
              aria-haspopup="true"
              component={moneyMarketDetail}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper >
  )
}

export default DashBoard
