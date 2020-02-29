import React from 'react'
import { Typography } from '@material-ui/core'
import store from "store";
import apis from '../../api';

const DashBoard = () => {
  const [username, setUsername] = React.useState('');

  const getName = async () => {
    let name = await apis.getUserById(store.get('username'));
    setUsername(name.data.data.username);
  }

  React.useEffect(() => {
    getName();
  }, [])

  return (
    <Typography>
      Dashboard Here.
      Welcome back, {username}
    </Typography>
  )
}

export default DashBoard
