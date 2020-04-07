import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm, { validate } from './RegistrationForm';

describe('Registration Form', () => {

  it('Render the Registration Form', () => {
    const component = shallow(<RegistrationForm />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('Validate should throw value required', () => {

    const form = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };

    const expectedValue = {
      "confirmPassword": "Required",
      "email": "Required",
      "firstName": "Required",
      "lastName": "Required", "password": "Required",
      "phone": "Required",
      "username": "Required"
    }

    expect(validate(form)).toEqual(expectedValue);
  });

  it('Validate should throw length errors', () => {

    const invalidLongName = 'BobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBob'

    const form = {
      username: invalidLongName,
      firstName: invalidLongName,
      lastName: invalidLongName,
      email: 'lukegmail.com',
      phone: '66448',
      password: 'password!',
      confirmPassword: 'pass!'
    };

    const expectedValue = {
      "confirmPassword": "Passwords must match",
      "email": "Invalid email address",
      "firstName": "Must be 50 characters or less",
      "lastName": "Must be 50 characters or less",
      "password": "Invalid password. Must contain at least 8 characters, a special character, a number, one uppercase and lowercase letter",
      "phone": "Invalid phone number",
      "username": "Must be 20 characters or less",
    }

    expect(validate(form)).toEqual(expectedValue);
  });
});
