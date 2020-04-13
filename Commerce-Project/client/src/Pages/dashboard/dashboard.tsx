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
      margin: '5rem 1rem',
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
  const [notificationDeposit, setNotificationDeposit] = React.useState(Number);
  const [notificationWithdrawal, setNotificationWithdrawal] = React.useState(Number);
  const [notificationOverdraft, setNotificationOverdraft] = React.useState(Number);
  const [notificationCheckingType, setNotificationCheckingType] = React.useState<any>(String);
  const [notificationMoneyType, setNotificationMoneyType] = React.useState<any>(String);
  const [notificationSavingsType, setNotificationSavingsType] = React.useState<any>(String);
  const [notificationDisableDeposit, setNotificationDisableDeposit] = React.useState(false);
  const [notificationDisableWithdrawal, setNotificationDisableWithdrawal] = React.useState(false);
  const [notificationDisableOverDraft, setNotificationDisableOverDraft] = React.useState(false);

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

  const getNotifications = async () => {
    let notifications = await apis.getNotifications(username);
    let checkingType = await apis.getLastCheckingTransaction(username);
    let moneyType = await apis.getLastMoneyMarketTransaction(username);
    let savingsType = await apis.getLastSavingsTransaction(username);

    setNotificationCheckingType(checkingType.data.data);
    setNotificationMoneyType(moneyType.data.data);
    setNotificationSavingsType(savingsType.data.data);
    setNotificationDeposit(notifications.data.data[0].largeDeposit);
    setNotificationWithdrawal(notifications.data.data[0].largeWithDrawal);
    setNotificationOverdraft(notifications.data.data[0].overDraft);
    setNotificationDisableDeposit(notifications.data.data[0].disableLargeDeposit);
    setNotificationDisableWithdrawal(notifications.data.data[0].disablelargeWithDrawal);
    setNotificationDisableOverDraft(notifications.data.data[0].disableoverDraft);
  }

  React.useEffect(() => {
    getBalances();
    getNotifications();
    // eslint-disable-next-line
  }, [])

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

  const depositNotification = () => {
    if (hideNotificationOne === false) {
      if (notificationDisableDeposit === false && notificationCheckingType.actionType === 'Deposit' && notificationCheckingType.amount >= notificationDeposit) {
        return true
      }
      else if (notificationDisableDeposit === false && notificationMoneyType.actionType === 'Deposit' && notificationMoneyType.amount >= notificationDeposit) {
        return true
      }
      else if (notificationDisableDeposit === false && notificationSavingsType.actionType === 'Deposit' && notificationSavingsType.amount >= notificationDeposit) {
        return true
      }
    }
  }

  const withdrawalNotification = () => {
    if (hideNotificationTwo === false) {
      if (notificationDisableWithdrawal === false && notificationCheckingType.actionType === 'Withdrawal' && notificationCheckingType.amount >= notificationWithdrawal) {
        return true
      }
      else if (notificationDisableWithdrawal === false && notificationMoneyType.actionType === 'Withdrawal' && notificationMoneyType.amount >= notificationWithdrawal) {
        return true
      }
      else if (notificationDisableWithdrawal === false && notificationSavingsType.actionType === 'Withdrawal' && notificationSavingsType.amount >= notificationWithdrawal) {
        return true
      }
    }
  }

  const lowBalanceNotification = () => {
    if (hideNotificationThree === false) {
      if (notificationDisableOverDraft === false && notificationOverdraft >= savings) {
        return '1'
      }
      else if (notificationDisableOverDraft === false && checking <= notificationOverdraft) {
        return true
      }
      else if (notificationDisableOverDraft === false && moneyMarket <= notificationOverdraft) {
        return true
      }
    }
  }

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Welcome back, {user}</Typography>
      <Divider className={divider} />

      {/* Notifications*/}
      {
        depositNotification() !== undefined &&
        <NotificationCard message='Large Deposit' onClick={removeNotificationOne} />
      }
      {
        withdrawalNotification() !== undefined &&
        <NotificationCard message='Large Withdrawal' onClick={removeNotificationTwo} />
      }
      {
        lowBalanceNotification() !== undefined &&
        <NotificationCard message='Low Balance' onClick={removeNotificationThree} />
      }

      {/* Checking Account*/}
      <ExpansionPanel className={expansion} elevation={3}>
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

      {/* Money Market Account*/}
      <ExpansionPanel className={expansion} elevation={3}>
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

      {/* Savings Account*/}
      <ExpansionPanel className={expansion} elevation={3}>
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
