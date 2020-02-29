import React from 'react'
import { Typography, Divider, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme } from '../../components';
import apis from '../../api';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      height: '100%'
    },
    divider: {
      marginTop: '2rem',
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
      paddingTop: '0.1875rem'
    },
    balancePadding: {
      paddingTop: '0.1875rem'
    }
  })
);



const DashBoard = () => {
  const { paper, divider, expansion, expansionHeader, balance, balancePadding } = useStyles()
  const [moneyMarket, setMoneyMarket] = React.useState(0);
  const [checking, setChecking] = React.useState(0);
  const [savings, setSavings] = React.useState(0);

  const getBalances = async () => {
    let check = await apis.getCheckingBalance();
    let save = await apis.getSavingsBalance();
    let money = await apis.getMoneyMarketBalance();

    setChecking(check.data.data[0].amount);
    setSavings(save.data.data[0].amount);
    setMoneyMarket(money.data.data[0].amount);

  }

  React.useEffect(() => {
    getBalances();
  }, [])

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Welcome back, Name</Typography>
      <Divider className={divider} />
      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel1" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Checking Account</Typography>
          <Typography variant='subtitle1' className={balancePadding}>Balance: $ </Typography>
          <Typography variant='subtitle1' className={balance}>{checking}</Typography>
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper >
  )
}

export default DashBoard
