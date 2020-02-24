import React from 'react'
import { TextField, Button, FormGroup, Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@material-ui/styles';
import apis from '../../api';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    textFieldMargin: {
      margin: '.5rem'
    },
    title: {
      marginBottom: '1rem',
    },
    buttonMargin: {
      marginTop: '2.5rem'
    },
    button: {
      marginTop: '1rem'
    },
    gridMargin: {
      margin: 'unset',
      width: '100%'
    }
  }),
);

const validate = (values: any) => {
  const errors = {} as any;
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 20) {
    errors.username = 'Invalid username';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i.test(values.password)) {
    errors.password = 'Invalid password.';
  }
  return errors;
};

const LoginForm = () => {
  const { textFieldMargin, buttonMargin, gridMargin, button, title } = useStyles();
  const [next, setNext] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: (values: any) => {
      apis.getUser(values).then(() => {
        formik.setSubmitting(false);
        setNext(true)
      })
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={8} className={gridMargin}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <FormGroup>
            <Typography className={title} align='center' variant="h5">Login Into Your Account</Typography>
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
            <Button className={buttonMargin} type="button" variant="contained" color="primary" onClick={formik.submitForm}>Login</Button>
            <Button className={button} type="button" variant="contained" color="secondary" href="/register">Register</Button>
          </FormGroup>
        </Grid>
      </Grid>
      {next ? <Redirect to="/dashboard" /> : false}
    </form>
  )
}

export default LoginForm
