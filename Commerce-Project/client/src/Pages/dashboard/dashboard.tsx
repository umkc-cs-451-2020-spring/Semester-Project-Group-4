import React from 'react'
import { Typography, Divider, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme } from '../../components';

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
    }
  }),
);

const DashBoard = () => {
  const { paper, divider, expansion, expansionHeader, balance } = useStyles()

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Welcome back, Name</Typography>
      <Divider className={divider} />
      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel1" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Checking Account</Typography>
          <Typography variant='subtitle1'>Balance: </Typography>
          <Typography variant='subtitle1' className={balance}>$1000</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel2" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Savings Account</Typography>
          <Typography variant='subtitle1'>Balance: </Typography>
          <Typography variant='subtitle1' className={balance}>$1000</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={expansion}>
        <ExpansionPanelSummary id="panel3" expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' className={expansionHeader}>Money Market Account</Typography>
          <Typography variant='subtitle1'>Balance:</Typography>
          <Typography variant='subtitle1' className={balance}>$1000</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Summary Details
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper >
  )
}

export default DashBoard
