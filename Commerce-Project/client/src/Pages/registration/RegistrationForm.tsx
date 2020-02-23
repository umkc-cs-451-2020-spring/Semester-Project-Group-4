import React from 'react'
import { TextField, Button, FormGroup, Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@material-ui/styles';
import { validate } from '../../utils/validators'
import apis from '../../api';

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
    validate,
    onSubmit: (values: any) => {
      apis.createUser(values).then(() => {

      })
    }
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
            <Button className={buttonMargin} disabled={formik.isSubmitting ? true : false} type="submit" variant="contained" color="primary" onClick={formik.submitForm}>Register</Button>
          </FormGroup>
        </Grid>
      </Grid>
    </form>
  )
}

export default RegistrationForm
