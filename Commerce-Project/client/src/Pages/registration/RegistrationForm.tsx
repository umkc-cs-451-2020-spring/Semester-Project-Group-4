import React from 'react'
import { TextField, Button, FormGroup, Grid, Typography, Paper } from '@material-ui/core'
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@material-ui/styles';
import apis from '../../api';
import { Redirect } from 'react-router-dom';
import { useLocalStorageSetState } from '../../utils/local-storage';

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
    buttonMargin: {
      marginTop: '2.5rem'
    },
    gridMargin: {
      margin: 'unset',
      width: '100%'
    },
    title: {
      marginBottom: '1rem'
    },
    font: {
      fontSize: 0
    }
  }),
);

export const validate = (values: any) => {
  const errors = {} as any;
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 50) {
    errors.firstName = 'Must be 50 characters or less';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 50) {
    errors.lastName = 'Must be 50 characters or less';
  }
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 20) {
    errors.username = 'Must be 20 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^\d{10}$/i.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i.test(values.password)) {
    errors.password = 'Invalid password. Must contain at least 8 characters, a special character, a number, one uppercase and lowercase letter';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match';
  }
  return errors;
};

const RegistrationForm = () => {
  const { textFieldMargin, buttonMargin, gridMargin, title, font, paper } = useStyles();
  const [next, setNext] = React.useState(false)
  const [name, setName] = useLocalStorageSetState('', 'username')

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
    validate,
    onSubmit: (values: any, actions: any) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 100)
      apis.createUser(values).then(() => {
        setName(formik.values.username);
        formik.setSubmitting(false);
        setNext(true)
      })
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper elevation={0} className={paper}>
        <Grid container spacing={8} className={gridMargin}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <FormGroup>
              <Typography className={title} align='center' variant="h5">Create Account</Typography>
              <TextField
                className={textFieldMargin}
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                helperText={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
                error={formik.touched.firstName && formik.errors.firstName ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                helperText={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
                error={formik.touched.lastName && formik.errors.lastName ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Username"
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                helperText={formik.errors.username && formik.touched.username ? formik.errors.username : null}
                error={formik.touched.username && formik.errors.username ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Email"
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                error={formik.touched.email && formik.errors.email ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Phone Number"
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}
                error={formik.touched.phone && formik.errors.phone ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Password"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                error={formik.touched.password && formik.errors.password ? true : false}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={textFieldMargin}
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                helperText={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                onBlur={formik.handleBlur}
              />
              <Button className={buttonMargin} disabled={formik.isSubmitting} type="submit" variant="contained" color="primary" onClick={formik.submitForm}>Register</Button>
            </FormGroup>
          </Grid>
          <Typography className={font}>{name}</Typography>
        </Grid>
      </Paper>
      {next ? <Redirect to="/dashboard" /> : false}
    </form>
  )
}

export default RegistrationForm
