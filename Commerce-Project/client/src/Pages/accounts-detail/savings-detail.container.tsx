import React from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import store from "store";
import apis from '../../api';


const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%'
    },
    divider: {
      marginTop: '1rem',
      marginBottom: '2rem'
    }
  })
);

const SavingsDetail = () => {
  // styles
  const { paper, divider } = useStyles()

  // Hooks
  const [savings, setSavings] = React.useState(0);

  const username = store.get('username');

  const getBalances = async () => {
    let save = await apis.getSavingsBalance(username);
    setSavings(save.data.data[0].amount);
  }

  React.useEffect(() => {
    getBalances();
  })

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Savings Account</Typography>
      <Divider className={divider} />
      {savings}
    </Paper >
  )
}

export default SavingsDetail
