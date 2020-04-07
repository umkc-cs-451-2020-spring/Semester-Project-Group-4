import React from 'react';
import { shallow } from 'enzyme';
import LoginForm, { validate } from './LoginForm';

describe('Login Form', () => {

  it('Render the Login Form', () => {
    const component = shallow(<LoginForm />);

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
      "username": "Required",
      "password": "Required"
    }

    expect(validate(form)).toEqual(expectedValue);
  });

  it('Validate should throw length errors', () => {

    const invalidLongName = 'BobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBobBob'

    const form = {
      username: invalidLongName,
      password: 'password!'
    };

    const expectedValue = {
      "password": "Invalid password.",
      "username": "Invalid username"
    }

    expect(validate(form)).toEqual(expectedValue);
  });
});

