import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
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
    title: {
      marginBottom: '1rem'
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
    },
    font: {
      fontSize: 0
    }
  }),
);

export const validate = (values: any) => {
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
  const { textFieldMargin, buttonMargin, gridMargin, button, title, font, paper } = useStyles();
  const [next, setNext] = React.useState(false)
  const [name, setName] = useLocalStorageSetState('', 'username')

  const registerLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to='/register' ref={ref} {...itemProps} />
      )),
    []
  );

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: (values: any) => {
      apis.getUser(values).then(() => {
        setName(formik.values.username);
        formik.setSubmitting(false);
        setNext(true)
        window.location.reload()
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
              <Typography className={title} align='center' variant="h5">Log in to Online Banking</Typography>
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
              <Button className={button} type="button" variant="contained" color="inherit" component={registerLink}>Register</Button>
            </FormGroup>
          </Grid>
          <Typography className={font}>{name}</Typography>
        </Grid>
      </Paper>
      {next ? <Redirect to="/dashboard" /> : false}
    </form >
  )
}

export default LoginForm
