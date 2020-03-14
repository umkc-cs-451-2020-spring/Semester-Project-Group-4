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

const MoneyMarketDetail = () => {
  // styles
  const { paper, divider } = useStyles()

  // Hooks
  const [moneyMarket, setMoneyMarket] = React.useState(0);

  const storage = store.get('username');

  const getBalances = async () => {
    let money = await apis.getMoneyMarketBalance(storage);
    setMoneyMarket(money.data.data[0].amount);
  }

  React.useEffect(() => {
    getBalances();
  })

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Money Market Account</Typography>
      <Divider className={divider} />
      {moneyMarket}
    </Paper >
  )
}

export default MoneyMarketDetail
