import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('Login Form', () => {

  it('Render the Login Form', () => {
    const component = shallow(<LoginForm />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});