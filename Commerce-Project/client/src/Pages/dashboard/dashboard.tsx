import React from 'react'
import { Typography, Divider, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import store from "store";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Edit } from '@material-ui/icons';
import { Theme, NotificationCard } from '../../components';
import apis from '../../api';
import { numberWithCommas } from '../../utils/numberFormatter';

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
    checkingExpansion: {
      marginTop: '2rem',
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
    },
    details: {
      flexDirection: "column"
    }
  })
);

const DashBoard = () => {
  // styles
  const { paper, divider, expansion, expansionHeader, balance, details, balancePadding, EditIcon, checkingExpansion } = useStyles()

  // Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [checking, setChecking] = React.useState(0);
  const [savings, setSavings] = React.useState(0);
  const [user, setUsername] = React.useState('');
  const [hideDeposit1, setHideDeposit1] = React.useState(false);
  const [hideDeposit2, setHideDeposit2] = React.useState(false);
  const [hideDeposit3, setHideDeposit3] = React.useState(false);
  const [hideWithdrawal1, setHideWithdrawal1] = React.useState(false);
  const [hideWithdrawal2, setHideWithdrawal2] = React.useState(false);
  const [hideWithdrawal3, setHideWithdrawal3] = React.useState(false);
  const [hideLowBalance1, setHideLowBalance1] = React.useState(false);
  const [hideLowBalance2, setHideLowBalance2] = React.useState(false);
  const [hideLowBalance3, setHideLowBalance3] = React.useState(false);
  const [notificationDeposit, setNotificationDeposit] = React.useState(Number);
  const [notificationWithdrawal, setNotificationWithdrawal] = React.useState(Number);
  const [notificationOverdraft, setNotificationOverdraft] = React.useState(Number);
  const [notificationCheckingType, setNotificationCheckingType] = React.useState<any>(String);
  const [notificationMoneyType, setNotificationMoneyType] = React.useState<any>(String);
  const [notificationSavingsType, setNotificationSavingsType] = React.useState<any>(String);
  const [notificationDisableDeposit, setNotificationDisableDeposit] = React.useState(Boolean);
  const [notificationDisableWithdrawal, setNotificationDisableWithdrawal] = React.useState(Boolean);
  const [notificationDisableOverDraft, setNotificationDisableOverDraft] = React.useState(Boolean);

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

  const checkingTitle = 'Checking Account';
  const moneyMarketTitle = 'Money Market Account';
  const savingsTitle = 'Savings Account'

  const removeNotificationOne = () => {
    return setHideDeposit1(true)
  }

  const removeNotificationTwo = () => {
    return setHideDeposit2(true)
  }

  const removeNotificationThree = () => {
    return setHideDeposit3(true)
  }

  const removeNotificationFour = () => {
    return setHideWithdrawal1(true)
  }

  const removeNotificationFive = () => {
    return setHideWithdrawal2(true)
  }

  const removeNotificationSix = () => {
    return setHideWithdrawal3(true)
  }

  const removeNotificationSeven = () => {
    return setHideLowBalance1(true)
  }

  const removeNotificationEight = () => {
    return setHideLowBalance2(true)
  }

  const removeNotificationNine = () => {
    return setHideLowBalance3(true)
  }

  const depositNotification1 = () => {
    if (!hideDeposit1) {
      if (notificationDisableDeposit === false && notificationCheckingType.actionType === 'Deposit' && notificationCheckingType.amount >= notificationDeposit) {
        return <NotificationCard message={`Large Deposit in ${checkingTitle}`} onClick={removeNotificationOne} />
      }
    }
  }
  const depositNotification2 = () => {
    if (!hideDeposit2) {
      if (!notificationDisableDeposit && notificationMoneyType.actionType === 'Deposit' && notificationMoneyType.amount >= notificationDeposit) {
        return <NotificationCard message={`Large Deposit in ${moneyMarketTitle}`} onClick={removeNotificationTwo} />
      }

    }
  }

  const depositNotification3 = () => {
    if (!hideDeposit3) {
      if (!notificationDisableDeposit && notificationSavingsType.actionType === 'Deposit' && notificationSavingsType.amount >= notificationDeposit) {
        return <NotificationCard message={`Large Deposit in ${savingsTitle}`} onClick={removeNotificationThree} />
      }
    }
  }

  const withdrawalNotification1 = () => {
    if (!hideWithdrawal1) {
      if (notificationDisableWithdrawal && notificationCheckingType.actionType === 'Withdrawal' && notificationCheckingType.amount >= notificationWithdrawal) {
        return <NotificationCard message={`Large Withdrawal in ${checkingTitle}`} onClick={removeNotificationFour} />
      }
    }
  }

  const withdrawalNotification2 = () => {
    if (!hideWithdrawal2) {
      if (notificationDisableWithdrawal && notificationMoneyType.actionType === 'Withdrawal' && notificationMoneyType.amount >= notificationWithdrawal) {
        return <NotificationCard message={`Large Withdrawal in ${moneyMarketTitle}`} onClick={removeNotificationFive} />
      }
    }
  }

  const withdrawalNotification3 = () => {
    if (!hideWithdrawal3) {
      if (notificationDisableWithdrawal && notificationSavingsType.actionType === 'Withdrawal' && notificationSavingsType.amount >= notificationWithdrawal) {
        return <NotificationCard message={`Large Withdrawal in ${savingsTitle}`} onClick={removeNotificationSix} />
      }
    }
  }

  const lowBalanceNotification1 = () => {
    if (!hideLowBalance1) {
      if (notificationDisableOverDraft && savings <= notificationOverdraft) {
        return <NotificationCard message={`Low Balance in ${savingsTitle}`} onClick={removeNotificationSeven} />
      }
    }
  }

  const lowBalanceNotification2 = () => {
    if (!hideLowBalance2) {
      if (notificationDisableOverDraft && checking <= notificationOverdraft) {
        return <NotificationCard message={`Low Balance in ${checkingTitle}`} onClick={removeNotificationEight} />
      }
    }
  }

  const lowBalanceNotification3 = () => {
    if (!hideLowBalance3) {
      if (notificationDisableOverDraft && moneyMarket <= notificationOverdraft) {
        return <NotificationCard message={`Low Balance in ${moneyMarketTitle}`} onClick={removeNotificationNine} />
      }
    }
  }

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Welcome back, {user}</Typography>
      <Divider className={divider} />

      {/* Notifications*/}
      {depositNotification1() !== undefined && depositNotification1()}
      {depositNotification2() !== undefined && depositNotification2()}
      {depositNotification3() !== undefined && depositNotification3()}
      {withdrawalNotification1() !== undefined && withdrawalNotification1()}
      {withdrawalNotification2() !== undefined && withdrawalNotification2()}
      {withdrawalNotification3() !== undefined && withdrawalNotification3()}
      {lowBalanceNotification1() !== undefined && lowBalanceNotification1()}
      {lowBalanceNotification2() !== undefined && lowBalanceNotification2()}
      {lowBalanceNotification3() !== undefined && lowBalanceNotification3()}

      {/* Checking Account*/}
      <ExpansionPanel className={checkingExpansion} elevation={3}>
        <ExpansionPanelSummary id="panel1" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Checking Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $ </Typography>
          <Typography variant='subtitle1' className={balance}>{numberWithCommas(checking)}</Typography>
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
        <ExpansionPanelDetails className={details}>
          <Typography variant='overline'>Suffix: 80</Typography>
          <Typography variant='overline'>ACH Number: 0011547957</Typography>
          <Typography variant='overline'>Available: ${numberWithCommas(checking)}</Typography>
          <Typography variant='overline'>MICR: 44587964234</Typography>
          <Typography variant='overline'>YTD Interest: $5.25</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* Savings Account*/}
      <ExpansionPanel className={expansion} elevation={3}>
        <ExpansionPanelSummary id="panel2" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Savings Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $ </Typography>
          <Typography variant='subtitle1' className={balance}>{numberWithCommas(savings)}</Typography>
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
        <ExpansionPanelDetails className={details}>
          <Typography variant='overline'>Suffix: 00</Typography>
          <Typography variant='overline'>Available: ${numberWithCommas(savings)}</Typography>
          <Typography variant='overline'>MICR: 79587967954</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* Money Market Account*/}
      <ExpansionPanel className={expansion} elevation={3}>
        <ExpansionPanelSummary id="panel3" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Money Market Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $</Typography>
          <Typography variant='subtitle1' className={balance}>{numberWithCommas(moneyMarket)}</Typography>
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
        <ExpansionPanelDetails className={details}>
          <Typography variant='overline'>Suffix: 90</Typography>
          <Typography variant='overline'>Available: ${numberWithCommas(moneyMarket)}</Typography>
          <Typography variant='overline'>MICR: 85687967154</Typography>
          <Typography variant='overline'>YTD Interest: $112.98</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper >
  )
}

export default DashBoard
