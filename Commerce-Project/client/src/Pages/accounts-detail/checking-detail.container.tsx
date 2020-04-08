import React from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import store from "store";
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
    }
  })
);

const CheckingDetail = () => {
  // styles
  const { paper, divider } = useStyles()

  // Hooks
  const [checking, setChecking] = React.useState(0);

  const username = store.get('username');

  const getBalances = async () => {
    let check = await apis.getMoneyMarketBalance(username);
    setChecking(check.data.data[0].amount);
  }

  React.useEffect(() => {
    getBalances();
  })

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Checking Account</Typography>
      <Divider className={divider} />
      {checking}
    </Paper >
  )
}

export default CheckingDetail
