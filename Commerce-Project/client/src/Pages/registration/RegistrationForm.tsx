import React from 'react'
import { TextField, Button, FormGroup, Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    textFieldMargin: {
      margin: '.5rem'
    },
    buttonMargin: {
      marginTop: '2.5rem'
    },
    gridMargin: {
      margin: 'unset'
    }
  }),
);

const RegistrationForm = () => {
  const { textFieldMargin, buttonMargin, gridMargin } = useStyles();

  const formik = useFormik({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={8} className={gridMargin}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <FormGroup>
            <Typography align='center' variant="h5">Create An Account</Typography>
            <TextField
              className={textFieldMargin}
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <TextField
              className={textFieldMargin}
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <TextField
              className={textFieldMargin}
              label="Username"
              id="Username"
              name="Username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <TextField
              className={textFieldMargin}
              label="Email"
              id="Email"
              name="Email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              className={textFieldMargin}
              label="Phone Number"
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <TextField
              className={textFieldMargin}
              label="Password"
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <TextField
              className={textFieldMargin}
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <Button className={buttonMargin} type="submit" variant="contained" color="primary">Register</Button>
          </FormGroup>
        </Grid>
      </Grid>
    </form>
  )
}

export default RegistrationForm
