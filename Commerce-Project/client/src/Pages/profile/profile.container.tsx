import React from 'react'
import {
  Paper,
  Typography,
  Button,
  FormGroup,
  Grid,
  TextField
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
    textFieldMargin: {
      margin: '.5rem'
    },
    divider: {
      marginTop: '1rem'
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
      marginTop: '2rem'
    },
    gridMargin: {
      margin: 'unset',
      width: '100%'
    },
    title: {
      marginBottom: '1rem'
    }
  })
);

export interface FormProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const ProfileContainer = () => {
  // Styles
  const { paper, gridMargin, textFieldMargin, save, title } = useStyles()

  // Hooks
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const username = store.get('username');

  const getUser = async () => {
    let user = await apis.getUserById(username);

    setFirstName(user.data.data.firstName);
    setLastName(user.data.data.lastName);
    setPhoneNumber(user.data.data.phoneNumber);
    setPassword(user.data.data.password);
    setConfirmPassword(user.data.data.confirmPassword);
  }

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [])


  const handleFirstChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFirstName(event.target.value as string);
  };

  const handleLastChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLastName(event.target.value as string);
  };

  const handlePhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhoneNumber(event.target.value as string);
  };

  const handlePasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPassword(event.target.value as string);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setConfirmPassword(event.target.value as string);
  };

  const saveUser = () => {
    const form: FormProps = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: confirmPassword
    }

    apis.updateUser(username, form)
  }

  return (
    <Paper elevation={0} className={paper}>
      <Grid container spacing={8} className={gridMargin}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <FormGroup>
            <Typography className={title} align='center' variant="h5">Manage Profile</Typography>
            <TextField
              className={textFieldMargin}
              label='First Name'
              id="first"
              value={firstName}
              onChange={handleFirstChange}
            />
            <TextField
              className={textFieldMargin}
              label='Last Name'
              id="last"
              value={lastName}
              onChange={handleLastChange}
            />
            <TextField
              className={textFieldMargin}
              label='Phone Number'
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            <TextField
              className={textFieldMargin}
              label='Password'
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              className={textFieldMargin}
              label='Confirm Password'
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button color='primary' variant='contained' className={save} onClick={saveUser}>Save</Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Paper >
  )
}

export default ProfileContainer
