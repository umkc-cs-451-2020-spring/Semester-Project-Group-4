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