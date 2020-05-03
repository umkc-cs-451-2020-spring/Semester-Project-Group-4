import React from 'react'
import {
  Divider,
  Paper,
  Typography,
  Button,
  FormControl,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Input,
  InputAdornment,
  Grid
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import store from "store";
import { Theme } from '../../components';
import apis from '../../api';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%',
      margin: '5rem 1rem',
    },
    divider: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    formControl: {
      margin: '1.5rem',
    },
    checkbox: {
      color: Theme.palette.primary.main,
      '&$checked': {
        color: Theme.palette.primary.main
      }
    },
    save: {
      marginTop: '.5rem'
    }
  })
);

export interface FormProps {
  largeDeposit: string;
  largeWithDrawal: string;
  overDraft: string;
  disableLargeDeposit: boolean;
  disablelargeWithDrawal: boolean;
  disableoverDraft: boolean;
}

const NotificationsContainer = () => {
  // Styles
  const { paper, divider, formControl, checkbox, save } = useStyles()

  // Hooks
  const [state, setState] = React.useState({
    lowCheck: false,
    depositCheck: false,
    withdrawalCheck: false
  });
  const [lowBalance, setLowBalance] = React.useState<string>('');
  const [deposit, setDeposit] = React.useState<string>('');
  const [withdrawal, setWithdrawal] = React.useState<string>('');

  const username = store.get('username');

  const getNotifications = async () => {
    let notifications = await apis.getNotifications(username);

    setDeposit(notifications.data.data[0].largeDeposit);
    setWithdrawal(notifications.data.data[0].largeWithDrawal);
    setLowBalance(notifications.data.data[0].overDraft);
    setState({
      depositCheck: notifications.data.data[0].disableLargeDeposit,
      lowCheck: notifications.data.data[0].disableoverDraft,
      withdrawalCheck: notifications.data.data[0].disablelargeWithDrawal
    });
  }

  React.useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleLowChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLowBalance(event.target.value as string);
  };

  const handleDepositChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeposit(event.target.value as string);
  };

  const handleWithdrawalChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWithdrawal(event.target.value as string);
  };

  const saveNotifications = () => {
    const form: FormProps = {
      largeDeposit: deposit,
      largeWithDrawal: withdrawal,
      overDraft: lowBalance,
      disableLargeDeposit: state.depositCheck,
      disablelargeWithDrawal: state.withdrawalCheck,
      disableoverDraft: state.lowCheck,
    }

    apis.updateNotifications(form, username)
  }

  const { lowCheck, depositCheck, withdrawalCheck } = state;

  return (
    <Paper elevation={0} className={paper}>
      <Grid>
        <Typography variant='h5'>Manage Notifications</Typography>
        <Button color='primary' variant='contained' className={save} onClick={saveNotifications}>Save</Button>
      </Grid>
      <Divider className={divider} />
      <Typography variant='h6'>Low Account Balance</Typography>
      <FormControl component="fieldset" className={formControl}>
        <FormLabel component="legend">Recieve notifications when an account goes below a set balance.</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={lowCheck} onChange={handleChange} name="lowCheck" className={checkbox} color='primary' />}
            label="Enable"
          />
          <Input
            id="lowBalance-adornment-amount"
            value={lowBalance}
            onChange={handleLowChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormGroup>
      </FormControl>
      <Divider className={divider} />
      <Typography variant='h6'>Large Deposit</Typography>
      <FormControl component="fieldset" className={formControl}>
        <FormLabel component="legend">Recieve notifications when an account has a large deposit above a set amount.</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={depositCheck} onChange={handleChange} name="depositCheck" className={checkbox} color='primary' />}
            label="Enable"
          />
          <Input
            id="deposit-adornment-amount"
            value={deposit}
            onChange={handleDepositChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormGroup>
      </FormControl>
      <Divider className={divider} />
      <Typography variant='h6'>Large Withdrawal</Typography>
      <FormControl component="fieldset" className={formControl}>
        <FormLabel component="legend">Recieve notifications when an account has a large withdrawal above a set amount.</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={withdrawalCheck} onChange={handleChange} name="withdrawalCheck" className={checkbox} color='primary' />}
            label="Enable"
          />
          <Input
            id="withdrawal-adornment-amount"
            value={withdrawal}
            onChange={handleWithdrawalChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormGroup>
      </FormControl>
    </Paper >
  )
}

export default NotificationsContainer
