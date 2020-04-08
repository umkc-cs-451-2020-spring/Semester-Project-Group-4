import React from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles';

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

const NotificationsContainer = () => {
  // styles
  const { paper, divider } = useStyles()

  return (
    <Paper elevation={0} className={paper}>
      <Typography variant='h5'>Manage Notifications</Typography>
      <Divider className={divider} />
    </Paper >
  )
}

export default NotificationsContainer
