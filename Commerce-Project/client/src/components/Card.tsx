import React from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import Close from '@material-ui/icons/Close';
import { Theme } from './Theme';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: 250,
      height: '7rem',
    },
    contentArea: {
      paddingTop: '.5rem',
      paddingRight: '.5rem',
      paddingLeft: '1rem'
    },
    iconColor: {
      color: Theme.palette.error.main,
      padding: 'unset',
      marginLeft: '67%'
    },
    title: {
      color: Theme.palette.error.main
    },
    closeButton: {
      flexDirection: 'row-reverse',
      padding: 'unset'
    },
    description: {
      paddingLeft: 'unset'
    },
    row: {
      display: 'inline-block',
      paddingRight: '1rem',
      paddingBottom: '1rem'
    }
  })
);

export interface NotificationProps {
  message: string;
  onClick: any;
}

export const NotificationCard = (props: NotificationProps) => {
  const { card, iconColor, contentArea, description, title, row } = useStyles();
  const { message, onClick } = props;

  return (
    <Paper elevation={0} className={row}>
      <Card className={card} variant="outlined">
        <CardContent className={contentArea}>
          <Typography variant="h5" component="h2" className={title}>
            Alert
          <Tooltip title='Remove'>
              <IconButton className={iconColor} onClick={onClick}>
                <Close />
              </IconButton>
            </Tooltip>
          </Typography>
          <CardContent className={description}>
            <Typography variant="body1" component="p">
              {message}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Paper>
  )
}